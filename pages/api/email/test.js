import { sendTest } from '@utils/emails';

export default function (req, res) {
    sendTest();
    console.log(req.body)
}

//https://medium.com/nerd-for-tech/coding-a-contact-form-with-next-js-and-nodemailer-d3a8dc6cd645
