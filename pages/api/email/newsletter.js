const SparkPost = require('sparkpost')
const client = new SparkPost(process.env.SPARKPOST_KEY)
const adminEmail = process.env.ADMIN_EMAIL;

export default function (req, res) {
    client.transmissions.send({
        metadata: {
            name: req.body.fullName,
            email: req.body.email,
        },
        content: {
          template_id: 'mw-user-newsletter',
        },
        recipients: [{
            address: req.body.email
        }]
      })
      .then(data => {
        console.log(data)
        res.status(200).json(true)
      })
      .catch(err => {
        console.log(err)
        es.status(500).json(false)
    })
}
