const { compare } = require("../utilities/bcrypt");
const { findUser } = require("../db/index");
const { handleError } = require("../utilities/handleError");
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
                        res.json({ status: 200 });
                    }
                })
                .catch(error => res.json(handleError(error, 400)));
        })
        .catch(error => res.json(handleError(error, 400)));
});

module.exports = router;