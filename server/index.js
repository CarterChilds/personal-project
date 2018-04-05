
require('dotenv').config()
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , controller = require('./controller')
    , massive = require('massive')

    var Flickr = require("flickrapi"),
//     flickrOptions = {
//       api_key: API_KEY,
//       secret: API_SECRET
//     };
 
//     Flickr.authenticate(flickrOptions, function(error, flickr) {
  
// });

flickrOptions = {
    api_key: API_KEY,
    secret: API_SECRET,

  };

Flickr.authenticate(flickrOptions, function(error, flickr) {
    console.log('i made it')
    app.set('flickr', flickr)
});
    // console.log('i exist')
    

// Flickr.tokenOnly(flickrOptions, function(error, flickr) {
//     console.log('.//..lk', flickr)
//     flickr.photos.search({
//           text: 'panda',
//           page: 1,
//           per_page: 100
//         }, function(err, result) {
//           console.log(result)
//         });
// });
    
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

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use( passport.initialize() )
app.use( passport.session() )

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    done(null, profile)
}))

passport.serializeUser( (profile, done) => {
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





app.listen(SERVER_PORT, () => console.log( 'Listening on port: ' + SERVER_PORT ))
