const SparkPost = require('sparkpost')
const client = new SparkPost(process.env.SPARKPOST_KEY)
const adminEmail = process.env.ADMIN_EMAIL;

export default function (req, res) {
    const data = {
        date: req.body.date,
        page: req.body.page,
        fName: req.body.firstName,
        lName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        postcode: req.body.postCode,
        profession: req.body.profession,
    }

    client.transmissions.send({
        metadata: data,
        content: {
          template_id: 'mw-admin-brochure',
        },
        recipients: [{
            address: adminEmail
        }]
      })
      .then(data => {
        res.status(200).json(true)
      })
      .catch(err => {
        res.status(500).json(false)
    })
}

//https://medium.com/nerd-for-tech/coding-a-contact-form-with-next-js-and-nodemailer-d3a8dc6cd645
