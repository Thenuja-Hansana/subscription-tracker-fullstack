const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a transporter (The "Mail Truck")
  // For production, you'd use Gmail, SendGrid, or Mailgun.
  // For now, let's use a "Dev" configuration.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `Subscription Tracker <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
