// publish key: pk_test_KCIiNtKjBsaAI7cQYiyE78UL
//secret key: sk_test_kAXWLaw1rK2pTNjo8wNkFUaj

require('dotenv').config()
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , controller = require('./controller')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , stripe = require('stripe')(process.env.SECRET_KEY_STRIPE)



    var Flickr = require("flickrapi"),


flickrOptions = {
    api_key: '191b748b6b2523a0054952cd7877d624',
    secret: '4ea384da6712ecbf'

  };

Flickr.authenticate(flickrOptions, function(error, flickr) {
    console.log('i made it')
    app.set('flickr', flickr)
});
    console.log('i exist')
    

    
    const { 
        SERVER_PORT, 
        SESSION_SECRET,
        DOMAIN,
        CLIENT_ID,
        CLIENT_SECRET,
        CALLBACK_URL,
        API_KEY,
        API_SECRET
    } = process.env;
    
    const app = express();

    massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));

app.use(bodyParser.json());
app.use(cors())


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    console.log('profile', profile)
   const db = app.get('db');
   db.find_user([profile.id]).then( userResult => {
        if(!userResult[0]){
            db.create_user([
                profile.username,
                profile.id,
                profile.profile_picture
            ]).then( createdUser => {
                return done(null, createdUser[0].id)
            })
        } else {
            return done(null, userResult[0].id)
        }
   })
}))

passport.serializeUser( (profile, done) => {
    console.log('serialized user')
    done(null, profile)
} )

passport.deserializeUser( (profile, done) => {
    done(null, profile)
} )

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000'
}))

app.get('/api/users', controller.getUser)
app.get('/api/posts', controller.getPosts)

//flickr api

app.get('/test/:tag', (req, res) => {
    req.app.get('flickr').photos.search({
        tags: req.params.tag,
        page: 1,
        per_page: 100
      }, function(err, result) {
        res.send(result)
      });
})

app.post('/api/payment', controller.payment)






app.listen(SERVER_PORT, () => console.log( 'Listening on port: ' + SERVER_PORT ))
