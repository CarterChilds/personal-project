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

    const app = express();


    var Flickr = require("flickrapi"),


flickrOptions = {
    api_key: '191b748b6b2523a0054952cd7877d624',
    secret: '4ea384da6712ecbf',
    user_id: process.env.USER_ID,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET

  };

Flickr.authenticate(flickrOptions, function(error, flickr) {
    console.log('i made it')
    app.set('flickr', flickr)
        
        
        
    });
    
    
    
    
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
    
    
    massive(process.env.CONNECTION_STRING).then(db => {
        app.set('db', db)
        // console.log("database connected")
        app.listen(SERVER_PORT, () => console.log( 'Listening on port: ' + SERVER_PORT ))
    } )
    
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
   const db = app.get('db');
   db.find_user([profile.id]).then( userResult => {
        if(!userResult[0]){
            console.log("creating new user")
            db.create_user([
                profile.displayName,
                profile.id,
                profile.picture
            ]).then( createdUser => {
                return done(null, createdUser[0].auth_id)
            })
        } else {
            
            return done(null, userResult[0].auth_id)
        }
   })
}))

passport.serializeUser( (id, done) => {
    done(null, id)
} )

passport.deserializeUser( (id, done) => {
    app.get('db').find_user([id])
    .then((user) => {
        done(null, user[0])
    })
} )

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/profile'
}))

app.get('/api/users', controller.getUser)
app.get('/api/posts', controller.getPosts)


app.get('/test/:tag', (req, res) => {
    req.app.get('flickr').photos.search({
        tags: req.params.tag,
        page: 1,
        per_page: 100
      }, function(err, result) {
        res.send(result)
      });
})

app.get('/api/user', function(req, res) {
    if(req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send('nice try suckaaaaaa')
    }
} )



app.post('/api/payment', controller.payment)






