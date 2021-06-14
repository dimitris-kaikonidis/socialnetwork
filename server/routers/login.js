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
                        res.json({ status: 200 });
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.json({ error: true, status: 400 });
                });
        })
        .catch(error => {
            console.log(error);
            res.json({ error: true, status: 400 });
        });
});

module.exports = router;