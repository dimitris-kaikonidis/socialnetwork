const { genHash } = require("../utilities/bcrypt");
const { addUser } = require("../db/index");
const express = require("express");
const router = express.Router();

router.post("/register.json", (req, res) => {
    const { first, last, email, password } = req.body;
    genHash(password)
        .then(hashedPassword => {
            addUser(first, last, email, hashedPassword)
                .then(result => {
                    const { id, first, last } = result.rows[0];
                    req.session.user = { id, first, last };
                    res.status(200).json({ id });
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