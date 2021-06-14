const { findUser, setNewPassword } = require("../db/index");
const { sendEmail } = require("../utilities/SES");
const { genHash, compare } = require("../utilities/bcrypt");
const { myEmail } = require("../secrets.json");
const cryptoRandomString = require("crypto-random-string");
const express = require("express");
const router = express.Router();

router.post("/password/reset/start.json", (req, res) => {
    const { email } = req.body;
    findUser(email).then(result => {
        if (result.rows[0]) {
            req.session.email = email;
            const secretCode = cryptoRandomString({ length: 10 });
            genHash(secretCode).then(hashedPassword => {
                setNewPassword(email, hashedPassword).then(() => {
                    sendEmail(myEmail, "Your password has been reset", secretCode);
                    res.status(200).json({});
                });
            });

        } else throw new Error("User Not Found");
    })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: true });
        });
});

router.post("/password/reset/verify.json", (req, res) => {
    const { tempPassword, newPassword } = req.body;
    const { email } = req.session;
    console.log(tempPassword);
    findUser(email).then(result => {
        compare(tempPassword, result.rows[0].password_hash)
            .then(pass => {
                if (!pass) throw new Error("Wrong password.");
                else {
                    setNewPassword(email, newPassword);
                    res.status(200).json({});
                }
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error: true });
            });
    })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: true });
        });
});

module.exports = router;