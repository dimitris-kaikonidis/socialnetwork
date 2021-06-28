const { genHash } = require("../utilities/bcrypt");
const { addUser, addSkills } = require("../db/index");
const express = require("express");
const router = express.Router();

router.post("/api/register", async (req, res) => {
    try {
        const { first, last, email, password } = req.body;
        if (!first || !last || !email || !password) throw new Error("Invalid inputs");
        const hashedPassword = await genHash(password);
        const response = await addUser(first, last, email, hashedPassword);
        const { id } = response.rows[0];
        addSkills(id);
        req.session.user = { id };
        res.status(200).json({ id });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true });
    }
});

module.exports = router;