const sgMail = require("@sendgrid/mail");

const Notification = {
  verificationToken(data) {
    const msg = {
      to: data.email, // Change to your recipient
      from: process.env.XLT_CUSTOMER_EMAIL, // Change to your verified sender
      subject: "Verification Token",
      html: `<strong>Your Verification Token is ${data.token}</strong>`
    };
    sgMail.setApiKey(process.env.XLT_KEY_SENDGRID);
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch(err => {
        console.error(err);
      });
  }
};

module.exports = Notification;
