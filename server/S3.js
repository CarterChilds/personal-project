require('dotenv').config({
    path: '../.dev.env'
})

const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY,
    region: 'us-west-2'
})

const S3 = new AWS.S3()

function uploadPhoto(req, res) {
    let photo = req.body,
        buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        params = {
            Bucket: 'flickercarter',
            Body: buf,
            Key: photo.filename,
            ContentType: photo.filetype,
            ACL: 'public-read'
        }


    S3.upload(params, (err, data) => {
        const db = req.app.get('db')
        db.create_post(data.Location, req.session.passport.user.user_id)
        .then(() => {
            console.log("Created Post")
        } )
        // console.log(err, data)
        // let response, code
        // err ? (resopnse = err, code = 500) : (response = data, code = 200)
        // res.status(code).send(response)
    })
}

module.exports = function (app) {
    app.post('/api/photoUpload', uploadPhoto)
}