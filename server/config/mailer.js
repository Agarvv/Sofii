
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});


const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: to, 
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions)
        .then(info => {
            console.log('Email sent: ' + info.response);
        })
        .catch(error => {
            console.error('Error sending email:', error);
        });
};

module.exports = { transporter, sendEmail };