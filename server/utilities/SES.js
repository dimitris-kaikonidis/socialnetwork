const aws = require("aws-sdk");

const secrets = process.env.NODE_ENV === "production" ? process.env : require("../secrets.json");

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: 'eu-central-1'
});

module.exports = function sendEmail(recipient, subject, message) {
    ses
        .sendEmail({
            Source: "dimitris.kaikonidis@gmail.com",
            Destination: {
                ToAddresses: [recipient]
            },
            Message: {
                Body: {
                    Text: {
                        Data: message
                    },
                },
                Subject: {
                    Data: subject
                }
            }
        })
        .promise().then(() => console.log('it worked!'))
        .catch(err => console.log(err));
};
