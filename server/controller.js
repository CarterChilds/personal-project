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
    dataBase.get_flickr_posts()
    .then( (posts) => res.status(200).send(posts) )
    .catch( (err) => {
     console.log(err)
        res.status(500).send()
    });
},

// getPhotos: flickr.photos.search({
//     text: 'panda',
//     page: 1,
//     per_page: 100
//   }, function(err, result) {
  
//   })
}
