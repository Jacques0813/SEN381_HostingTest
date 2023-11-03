import * as nodemailer from 'nodemailer';
import dotenv from "dotenv";

export class Email {
    private transporter;
    constructor(){
      dotenv.config();
      
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '3000'),
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }

    // async..await is not allowed in global scope, must use a wrapper
    public async send(email:string, subject:string, text:string) {
      // send mail with defined transport object
      const info = await this.transporter.sendMail({
        from: '"PREMIER SERVICE DEPARTMENT" <premiersssen381@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: `${subject}✔`, // Subject line
        text: `${text}`, // plain text body
      });

      console.log("Message sent: %s", info.messageId);
      return ({ message: `Message sent: ${info.messageId}` })
    }
}