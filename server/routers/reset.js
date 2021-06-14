const { findUser } = require("../db/index");
const express = require("express");
const router = express.Router();

router.post("/password/reset/start.json", (req, res) => {
    const { email } = req.body;
    findUser(email)
        .then(result => {
            if (result.rows[0]) {
                res.status(200).json({});
            } else throw new Error("User Not Found");
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: true });
        });
});

router.post("/password/reset/verify.json", (req, res) => {

});

module.exports = router;