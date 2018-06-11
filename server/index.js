require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0"),
  controller = require("./controller"),
  massive = require("massive"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  stripe = require("stripe")(process.env.SECRET_KEY_STRIPE),
  S3 = require("./S3.js");
  loggedIn = require('./middleware')

const app = express();

var Flickr = require("flickrapi"),
  //accessing flickr api
  flickrOptions = {
    api_key: process.env.API_KEY,
    secret: process.env.API_SECRET,
    user_id: process.env.USER_ID,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  };

Flickr.authenticate(flickrOptions, function(error, flickr) {
  console.log("i made it");
  app.set("flickr", flickr);
});

const {
  SERVER_PORT,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  API_KEY,
  API_SECRET,
  LOGOUT_REDIRECT
} = process.env;

//connecting database to server
massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
  // console.log("database connected")
  app.listen(SERVER_PORT, () =>
    console.log("Listening on port: " + SERVER_PORT)
  );
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//build
app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
//amazon s3
app.use(
  "/s3",
  require("react-s3-uploader/s3router")({
    bucket: "flickercarter",
    region: "us-west-2", //optional
    signatureVersion: "v4", //optional (use for some amazon regions: frankfurt and others)
    headers: { "Access-Control-Allow-Origin": "*" }, // optional
    ACL: "private", // this is default
    uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  })
);
// auth strategy that logs users to the database if they have never logged in before
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: "openid profile"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      const db = app.get("db");
      db.find_user([profile.id]).then(userResult => {
        if (!userResult[0]) {
          console.log("creating new user");
          db
            .create_user([profile.displayName, profile.id, profile.picture])
            .then(createdUser => {
              return done(null, createdUser[0]);
            });
        } else {
          return done(null, userResult[0]);
        }
      });
    }
  )
);

S3(app);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  app
    .get("db")
    .find_user([user.auth_id])
    .then(user => {
      done(null, user[0]);
    });
});

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: process.env.SUCCESS_REDIRECT
  })
);

app.get('/auth/me', loggedIn, function(req, res, next) {
  res.sendStatus(200)
});


app.get("/auth/logout", (req, res) => {
  console.log("logging out");
  req.logOut();

  res.redirect(
    302,
    `https://carter-childs.auth0.com/v2/logout?returnTo=${LOGOUT_REDIRECT}&client_id=${CLIENT_ID}`
  );
});

//CRUD endpoints
app.get("/api/users", controller.getUser);
app.get("/api/posts/:id", controller.getPosts);
app.delete("/api/deletepost/:id", controller.deletePost);
app.put("/api/updatebio", controller.updateBio);
app.get('/api/getBio/:id', controller.getBio)

//end point that enables photostream photos
app.get("/test/:tag", (req, res) => {
  req.app.get("flickr").photos.search(
    {
      tags: req.params.tag,
      page: 1,
      per_page: 100
    },
    function(err, result) {
      res.send(result);
    }
  );
});

app.get("/api/user", function(req, res) {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send("nice try suckaaaaaa");
  }
});

//stripe endpoint
app.post("/api/payment", controller.payment);
