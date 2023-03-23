const nodemailer = require("nodemailer");
require("dotenv").config();
//const sgMail = require("@sendgrid/mail");

const sendEmail = async (fixEmail, sendEmail, subject) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: "SG.TzcaDcCGQnWQo6ObvnVGrg.EGCVVw3GidwRyfpGlSyQO66ma8FOvUQCgKSaYFeQSNo",
    },
  });

  transporter.sendMail(
    {
      from: fixEmail,
      to: sendEmail,
      subject: subject,
      html: "<h1>testando email</h1>",
    },
    function (err, info) {
      if (err) console.log(err);
      else console.log("Email sent: " + info.response);
    }
  );
};

sendEmail("drayner@br.ibm.com", "rafaeloliveira@ibm.com", "assunto");
