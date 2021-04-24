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
        console.log('Woohoo! You just sent your first mailing!')
        console.log(data)
      })
      .catch(err => {
        console.log('Whoops! Something went wrong')
        console.log(err)
    })
}
