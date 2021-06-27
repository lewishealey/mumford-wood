const SparkPost = require('sparkpost')
const client = new SparkPost(process.env.SPARKPOST_KEY)
const fromEmail = process.env.FROM_EMAIL;
const adminEmail = process.env.ADMIN_EMAIL;

export async function sendTest() {
    client.transmissions.send({
        content: {
          from: fromEmail,
          subject: 'Hello from node-sparkpost',
          html: '<p>Hello world</p>'
        },
        recipients: [
          {address: 'hello@lewi.sh'}
        ]
      })
      .then(data => {
      })
      .catch(err => {
    })
}
