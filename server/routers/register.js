const { genHash } = require("../utilities/bcrypt");
const { addUser } = require("../db/index");
const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    genHash(password)
        .then(hashedPassword => {
            addUser(first, last, email, hashedPassword)
                .then(result => {
                    const { id, first, last } = result.rows[0];
                    req.session.user = { id, first, last };
                    res.json({ id, status: 200 });
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
});



module.exports = router;