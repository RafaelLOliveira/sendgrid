require("dotenv").config();
const nodemailer = require("nodemailer");
const emailProvider = require("./config/emailProvider.js");

//Code Engine Environment Variable -> CE_DATA
let transactionData = JSON.parse(process.env.CE_DATA);

//Accessing CE_DATA
let amount = transactionData.amountTransaction;
let senderName = transactionData.userSourceTransaction.firstNameUser;
let receiverName = transactionData.userDestinyTransaction.firstNameUser;
let receiverEmail = transactionData.userDestinyTransaction.emailUser;

//Email message
const emailContent = `<h2>Olá ${receiverName}, </h2>
<h3>Você recebeu uma transação de ${senderName} no valor de ${amount} reais.</h3>
<h4> At, <br /> Equipe Rigel. </h4>`;

const sendEmail = async (fixEmail, sendEmail) => {
  emailProvider.sendMail(
    {
      from: fixEmail,
      to: sendEmail,
      subject: "Tranferência recebida",
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
