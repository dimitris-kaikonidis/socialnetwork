const { findUser, findResetCode, setNewPassword, setResetCode, deleteResetCode } = require("../db/index");
const { sendEmail } = require("../utilities/SES");
const { genHash } = require("../utilities/bcrypt");
const { myEmail } = require("../secrets.json");
const cryptoRandomString = require("crypto-random-string");
const express = require("express");
const router = express.Router();

router.post("/api/password/reset/reset", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await findUser(email);
        if (user.rows[0]) {
            req.session.email = email;
            const resetCode = cryptoRandomString({ length: 10 });
            await setResetCode(email, resetCode);
            sendEmail(myEmail, "Your password has been reset", resetCode);
            res.status(200).json({});
        } else throw new Error("User Not Found");

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true });
    }
});

router.post("/api/password/reset/verify", async (req, res) => {
    const { resetCode, newPassword } = req.body;
    const { email } = req.session;
    try {
        const result = await findResetCode(email);
        const { code } = result.rows[0];
        if (code === resetCode) {
            const hashedPassword = await genHash(newPassword);
            await setNewPassword(email, hashedPassword);
            deleteResetCode(email);
            res.status(200).json({});
        } else throw new Error("Wrong Code");
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true });
    }
});

module.exports = router;