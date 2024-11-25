function sendMail(user) {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      secure: true,
      host: "smtp.gmail.com",
      auth: { user: "cosit.massy03dt@gmail.com", pass: "zvqsokilcnwuylvt" },
      tls: { rejectUnauthorized: false },
    })
  );
  const date = new Date(user.date_expiration);
  const mailOptions = {
    from: "diarafasouk@gmail.com",
    to: user.email_client,
    subject: "Création de compte",
    html: `
          <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Création de compte</title>
</head>
<body>
    <p>Bonjour <strong> ${user.prenom} ${user.nom}</strong>,</p>

    <p>Nous sommes ravis de vous informer que votre compte a été créé avec succès sur MRV Mali.</p>

    <p>Voici vos identifiants pour accéder à la plateforme :</p>
    <ul>
        <li><strong>Nom d'utilisateur :</strong> ${user.username}</li>
        <li><strong>Mot de passe :</strong> ${user.password}</li>
    </ul>

    <p>Pour vous connecter, cliquez sur le lien suivant :</p>
    <p><a href="${platformURL}" target="_blank">${platformURL}</a></p>

    <p>Il faudra changer votre mot de passe dès votre première connexion pour garantir la sécurité de votre compte.</p>

    <p>Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.</p>

    <p>Merci de votre confiance !</p>

    <p>Cordialement,</p>
    <p><strong>L'équipe MRV Mali</strong></p>
</body>
</html>

            `,
  };

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take your messages");
    }
  });

  //send verification email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail SID: ", info.messageId);
    }
  });
}
