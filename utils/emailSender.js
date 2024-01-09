const ElasticEmail = require("@elasticemail/elasticemail-client");

const { ELASTIC_API_KEY, EMAIL_FROM } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;
const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY;
const api = new ElasticEmail.EmailsApi();

class MailService {
  sendMail = (email, verificationToken) => {
    const params = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [new ElasticEmail.EmailRecipient(email)],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: `<h2>Hello!</h2><p>Verify email: http://localhost:${process.env.PORT}/users/verify/${verificationToken}</p>`,
          }),
        ],
        Subject: "Verification email",
        From: EMAIL_FROM,
      },
    });
    api.emailsPost(params, this.callback);
  };
  callback = (error, data, response) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log("API called successfully.");
    }
  };
}

module.exports = new MailService();
