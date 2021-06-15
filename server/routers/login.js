const { compare } = require("../utilities/bcrypt");
const { findUser } = require("../db/index");
const express = require("express");
const router = express.Router();

router.post("/login.json", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUser(email);
        const pass = await compare(password, user.rows[0].password_hash);
        if (!pass) throw new Error("Wrong password.");
        else {
            const { id, first, last } = user.rows[0];
            req.session.user = { id, first, last };
            res.status(200).json({});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true });
    }
});

module.exports = router;