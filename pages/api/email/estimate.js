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
        res.status(200).json(true)
      })
      .catch(err => {
        res.status(500).json(false)
    })
}

// https://medium.com/nerd-for-tech/coding-a-contact-form-with-next-js-and-nodemailer-d3a8dc6cd645
// https://docs.microsoft.com/en-us/graph/permissions-reference
// https://docs.microsoft.com/en-us/graph/api/chatmessage-post?view=graph-rest-1.0&tabs=http
// https://developer.microsoft.com/en-us/outlook/blogs/how-to-empower-your-microsoft-365-team-with-a-microsoft-graph-and-ifttt-integration/
// https://docs.microsoft.com/en-us/graph/auth-v2-service
// https://www.npmjs.com/package/@microsoft/microsoft-graph-client
