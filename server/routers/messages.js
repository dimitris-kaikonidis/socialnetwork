const { getMessagesFirst } = require("../db/index");

const express = require("express");
const router = express.Router();

router.get("/api/messages", async (req, res) => {
    const { id } = req.session.user;
    const { targetId } = req.query;
    try {
        const response = await getMessagesFirst(id, targetId);
        res.status(200).json(response.rows.reverse());
    } catch (error) {
        console.log(error);
        res.status(400).json([]);
    }
});

module.exports = router;