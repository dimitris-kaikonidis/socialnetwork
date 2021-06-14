const { findUser, findResetCode, setNewPassword, setResetCode } = require("../db/index");
const { sendEmail } = require("../utilities/SES");
const { myEmail } = require("../secrets.json");
const cryptoRandomString = require("crypto-random-string");
const express = require("express");
const router = express.Router();

router.post("/password/reset/start.json", (req, res) => {
    const { email } = req.body;
    findUser(email).then(result => {
        if (result.rows[0]) {
            req.session.email = email;
            const resetCode = cryptoRandomString({ length: 10 });
            setResetCode(email, resetCode)
                .then(() => {
                    sendEmail(myEmail, "Your password has been reset", resetCode);
                    res.status(200).json({});
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error: true });
                });
        } else throw new Error("User Not Found");
    })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: true });
        });
});

router.post("/password/reset/verify.json", (req, res) => {
    const { resetCode, newPassword } = req.body;
    const { email } = req.session;
    findResetCode(email).then(result => {
        const { code } = result.rows[0];
        if (code === resetCode) {
            setNewPassword(email, newPassword)
                .then(() => {
                    res.status(200).json({});
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error: true });
                });
        } else throw new Error("Wrong Code");
    })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: true });
        });
});

module.exports = router;