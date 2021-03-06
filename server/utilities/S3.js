const fs = require("fs");
const aws = require("aws-sdk");

const secrets = process.env.NODE_ENV === "production" ? process.env : require("../secrets.json");

const s3 = new aws.S3({
    credentials: new aws.Credentials(secrets.AWS_KEY, secrets.AWS_SECRET),
});

module.exports.uploadFile = fileToUpload => {
    const { filename, mimetype, size, path } = fileToUpload;
    return s3
        .putObject({
            Bucket: "socialnetwork-dim",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size
        })
        .promise();
};

module.exports.deleteFile = fileUrl => {
    return s3
        .deleteObject({
            Bucket: "socialnetwork-dim",
            Key: fileUrl
        })
        .promise();
};

module.exports.getS3URL = filename => "https://socialnetwork-dim.s3.eu-central-1.amazonaws.com/" + filename;