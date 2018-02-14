import * as nodemailer from "nodemailer";
import config from "../config";

console.log(config.emailServer);

const transporter = nodemailer.createTransport(config.emailServer);

interface emailOption {
  from: string;
  to: string;
  subject: string;
  text: string;
}

const sendEmail = function(opts: emailOption) {
  new Promise((resolve, reject) => {
    transporter.sendMail(opts, function(error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Message sent: " + info.response);
        resolve(info.response);
      }
    });
  });
};

// sendEmail({
//   from: "chenkang084@163.com",
//   to: "chenkang1@lenovo.com",
//   subject: "email example",
//   text: "hello world"
// });
