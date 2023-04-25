require("dotenv").config();
const emailProvider = require("./config/emailProvider.js");
const http = require("http");

const sendEmail = async (senderEmail, receiverEmail, emailContent) => {
  emailProvider.sendMail(
    {
      from: senderEmail,
      to: receiverEmail,
      subject: "Tranferência recebida",
      html: emailContent,
    },
    function (err, info) {
      if (err) console.log(err);
      else console.log("Email sent: " + info.response);
    }
  );
};

//POST HTTP listener
http
  .createServer(function (req, res) {
    var body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      //Accessing JSON sent by HTTP body
      let transactionData = JSON.parse(body);
      let amount = transactionData.amountTransaction;
      let senderName = transactionData.userSourceTransaction.firstNameUser;
      let receiverName = transactionData.userDestinyTransaction.firstNameUser;
      let receiverEmail = transactionData.userDestinyTransaction.emailUser;

      //Email message
      const emailContent = `<h2>Olá ${receiverName}, </h2>
      <h3>Você recebeu uma transação de ${senderName} no valor de ${amount} reais.</h3>
      <h4> At, <br /> Equipe Rigel. </h4>`;

      //Send email function
      sendEmail(process.env.SENDER_EMAIL, receiverEmail, emailContent);

      console.log(body);
      res.write(body);
      res.end();
    });
  })
  .listen(8080);
