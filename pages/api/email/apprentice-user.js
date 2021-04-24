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
        address: req.body.address,
        postcode: req.body.postcode,
        dob: req.body.dob,
        carerName: req.body.carerName,
        carerPhone: req.body.carerPhone,
        notes: req.body.notes,
    }

    client.transmissions.send({
        metadata: data,
        content: {
          template_id: 'mw-user-apprenticeship',
        },
        recipients: [{
            address: data.email
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
