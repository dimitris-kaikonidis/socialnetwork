const { getComments, postComment } = require("../db/index");
const express = require("express");
const router = express.Router();

router.get("/api/comments/get", async (req, res) => {
    const { postId } = req.query;
    try {
        const response = await getComments(postId);
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
});

router.post("/api/comments/post", async (req, res) => {
    const { id } = req.session.user;
    const { postId, comment } = req.body;
    try {
        const response = await postComment(id, postId, comment);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
});

module.exports = router;
