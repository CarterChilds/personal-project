require("dotenv").config();
var stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);

module.exports = {
  //function that grabs user from user database
  getUser: (req, res) => {
    let dataBase = req.app.get("db");
    dataBase
      .get_flickr_users()
      .then(users => res.status(200).send(users))
      .catch(err => {
        console.log(err);
        res.status(500).send();
      });
  },

  //function that grabs posts from database
  getPosts: (req, res) => {
    let dataBase = req.app.get("db");
    dataBase
      .get_flickr_posts(req.params.id)
      .then(posts => res.status(200).send(posts))
      .catch(err => {
        console.log(err);
        res.status(500).send();
      });
  },
  //function that enables stripe
  payment: (req, res, next) => {
    const charge = stripe.charges.create(
      {
        amount: req.body.amount,
        currency: "usd",
        source: req.body.token.id,
        description: "Test charge from Flickr App"
      },
      function(err, charge) {
        if (err) {
          return res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  },
  //function that allows user to delete post and have it reflect in the database
  deletePost: (req, res, next) => {
    let db = req.app.get("db");
    db.delete_post([req.params.id]).then(() => {
      db.get_flickr_posts([req.session.passport.user.user_id]).then(result => {
        res.send(result);
      });
    });
  },

  //function that enables users to update their bio and have it reflect in the database
  updateBio: (req, res) => {
    let { bio } = req.body;
    let db = req.app.get("db");
    console.log(bio);
    db.update_bio([bio, req.session.passport.user.user_id]).then(result => {
      res.status(200).send(result);
    });
  },

  getBio: (req, res) => {
    let db = req.app.get("db");

    db.get_bio([req.params.id])
      .then(bio => {
        res.status(200).send(bio);
      })
      .catch(err => {
        res.status(500).send(err);
        console.log(err);
      });
  }
};
