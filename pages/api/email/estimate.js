const SparkPost = require('sparkpost')
const client = new SparkPost(process.env.SPARKPOST_KEY)
const adminEmail = process.env.ADMIN_EMAIL;

export default function (req, res) {
    client.transmissions.send({
        metadata: req.body,
        content: {
          template_id: 'mw-admin-estimate',
        },
        recipients: [{
            address: adminEmail
        }]
      })
      .then(data => {
        // console.log(data)
        res.status(200).json(true)
      })
      .catch(err => {
        // console.log(err)
        res.status(500).json(false)
    })
}

//https://medium.com/nerd-for-tech/coding-a-contact-form-with-next-js-and-nodemailer-d3a8dc6cd645
