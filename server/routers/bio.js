const { setBio } = require("../db/index");
const express = require("express");
const router = express.Router();

router.post("/api/user/bio/save", async (req, res) => {
    const { id } = req.session.user;
    const { bio } = req.body;
    try {
        const result = await setBio(id, bio);
        res.status(200).json({
            bio: result.rows[0].bio
        });
    } catch (error) {
        console.log(error);
        res.json({ error: true });
    }
});

module.exports = router;