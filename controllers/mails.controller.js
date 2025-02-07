import NodeMailer from 'nodemailer';

// Mail Config : 
const transporter = NodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Contact Mail : 
export async function sendMessage(req, res) {
    try {
        const { firstname, name, email, message } = req.body;
        //console.log(firstname, name, email, message); // Debugging

        const messageMail = ({
            from: `"Portfolio" <rubio.abela06@gamil.com>`,
            to: "rubio.abela@ecole-isitech.fr",
            subject: "Portfolio - Message",
            text: "Hello world?",
            html: `
                <div style="font-family: Arial, sans-serif; width: 50%; margin: 0 auto; background-color: #ffffff; color: #999;">
                    <p>Bonjour Rubio,</p>
                    <p style="color: #999;">Vous avez reçu un message de la part de <span style="color: #3F51B5;">${firstname} - ${name} | ${email}</span>.</p>
                    <p style="color: #3F51B5;">Message :</p>
                    <p style="padding: 1rem; border: solid 1px #3F51B5; color: #000; border-radius: 0.5rem;">${message}</p>
                </div>
            `,
        });

        const confirmMail = ({
            from: `"Portfolio" <rubio.abela06@gamil.com>`,
            to: `${email}`,
            subject: "Portfolio - Message",
            text: "Hello world?",
            html: `
                <div style="font-family: Arial, sans-serif; color: #3F51B5; text-align: center; width: 50%; margin: 0 auto;">
                    <h1 style="color: #3F51B5;">Bonjour ${firstname} ${name},</h1>
                    <p><b>Votre message a été envoyé avec succès. Vous aurez une réponse sous 24 heures, merci pour votre message.</b></p>
                    <a style="display: inline-block; padding: 10px 20px; background-color: #3F51B5; color: #fff; text-decoration: none; border-radius: 5px; margin: 10px 0;" href="http://localhost:5173/" target="_blank">Retourner sur le site</a>
                    <p style="font-size: 12px; color: #999;">Ceci est un mail automatique, merci de ne pas répondre.</p>
                </div>
            `,
        });

        await transporter.sendMail(messageMail);
        await transporter.sendMail(confirmMail);

        res.status(200).send("Mail sent");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}