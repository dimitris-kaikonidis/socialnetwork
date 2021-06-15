const { genHash } = require("../utilities/bcrypt");
const { addUser } = require("../db/index");
const express = require("express");
const router = express.Router();

router.post("/register.json", async (req, res) => {
    try {
        const { first, last, email, password } = req.body;
        const hashedPassword = await genHash(password);
        const dbResult = await addUser(first, last, email, hashedPassword);
        const { id } = dbResult.rows[0];
        req.session.user = { id, first, last };
        res.status(200).json({ id });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true });
    }
});

module.exports = router;