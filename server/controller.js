require('dotenv').config()
var stripe = require("stripe")(process.env.SECRET_KEY_STRIPE)

module.exports = {
    getUser: (req, res) => {
        let dataBase = req.app.get('db');
        dataBase.get_flickr_users()
        .then( (users) => res.status(200).send(users) )
        .catch( (err) => {
         console.log(err)
            res.status(500).send()
        });
},





getPosts: (req, res) => {
    let dataBase = req.app.get('db');
    dataBase.get_flickr_posts(req.params.id)
    .then( (posts) => res.status(200).send(posts) )
    .catch( (err) => {
     console.log(err)
        res.status(500).send()
    });
},

payment: (req, res, next) => {
    const charge = stripe.charges.create({
        amount: req.body.amount,
        currency:"usd",
        source: req.body.token.id,
        description: 'Test charge from Flickr App'

    }, function(err, charge){
        if (err) {
            return res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
},

deletePost: (req, res, next) => {
    let db = req.app.get('db')
    db.delete_post([req.params.id])
    .then(() => {
        db.get_flickr_posts([req.session.passport.user.user_id]).then((result) => {
            res.send(result)
        } )
    }
    )} ,


 updateBio: (req, res) => {
     let {bio} = req.body
     let db = req.app.get('db')
     console.log(bio)
     db.update_bio([bio, req.session.passport.user.user_id])
     .then((result) => {
         res.status(200).send(result)
     } )
 },
 
 getBio:(req, res) => {
     let {bio} = req.body
     let db = req.app.get('db')
     db.get_bio([bio, req.session.passport.user.user_id])
     .then((result) => {
         res.status(200).send(result)
     })
 }


}


