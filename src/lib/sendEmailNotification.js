const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailNotification = (email, message) => {
  const msg = {
    to: email,
    from: 'no-reply@yourdomain.com',
    subject: 'New Open Call Created',
    text: message,
    html: `<p>${message}</p>`,
  };

  sgMail.send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
};
