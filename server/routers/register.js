const { genHash } = require("../utilities/bcrypt");
const { addUser } = require("../db/index");
const { handleError } = require("../utilities/handleError");
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
                    res.json({ id, status: 200 });
                })
                .catch(error => res.json(handleError(error, 400)));
        })
        .catch(error => res.json(handleError(error, 400)));
});

module.exports = router;