const { compare } = require("../utilities/bcrypt");
const { findUser } = require("../db/index");
const express = require("express");
const router = express.Router();

router.post("/login.json", (req, res) => {
    const { email, password } = req.body;
    findUser(email)
        .then(result => {
            compare(password, result.rows[0].password_hash)
                .then(pass => {
                    if (!pass) throw new Error("Wrong password.");
                    else {
                        const { id, first, last } = result.rows[0];
                        req.session.user = { id, first, last };
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