require("dotenv").config();
const nodemailer = require("nodemailer");

//Code Engine Environment Variable -> CE_DATA
let transactionData = JSON.parse(process.env.CE_DATA);

//Accessing JSON sent by HTTP body
let amount = transactionData.amountTransaction;
let senderName = transactionData.userSourceTransaction.firstNameUser;
let receiverName = transactionData.userDestinyTransaction.firstNameUser;
let receiverEmail = transactionData.userDestinyTransaction.emailUser;

//Email message
const emailContent = `<h2>Olá ${receiverName}, </h2>
<h3>Você recebeu uma transação de ${senderName} no valor de ${amount} reais.</h3>
<h4> At, <br /> Equipe Rigel. </h4>`;

const sendEmail = async (fixEmail, sendEmail) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SENDGRID_HOST,
    port: process.env.SENDGRID_PORT,
    secure: false,
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS,
    },
  });

  transporter.sendMail(
    {
      from: fixEmail,
      to: sendEmail,
      subject: "New bank transfer received",
      html: emailContent,
    },
    function (err, info) {
      if (err) console.log(err);
      else console.log("Email sent: " + info.response);
    }
  );
};

//Send email function
sendEmail(process.env.FROM_EMAIL, receiverEmail);
