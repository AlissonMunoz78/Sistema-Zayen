import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    }
});

const sendMailToRegister = (userMail, token) => {

    let mailOptions = {
        from: 'zayen@epn.com',
        to: userMail,
        subject: "ZAYEN",
        html: `<p>Hola, haz clic <a href="${process.env.URL_BACKEND}confirmar/${token}">aquí</a> para confirmar tu cuenta.</p>
        <hr>
        <footer>El sistema ZAYEN te da la mas cordial bienvenida, pon mucha atención durante el recorrido!</footer>
        `
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
        }
    })
}

export default sendMailToRegister //wtf?