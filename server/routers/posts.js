const { makePost, getAllPostsFirst, getAllPostsNext } = require("../db/index");
const express = require("express");
const router = express.Router();

router.post("/api/posts/post", async (req, res) => {
    const { post, id } = req.body;
    await makePost(post, id);
    res.status(200).json({});
});

router.get("/api/posts/all", async (req, res) => {
    try {
        let response;
        if (!req.query.next) response = await getAllPostsFirst();
        else response = await getAllPostsNext(req.query.next);
        const allPosts = response.rows;
        res.status(200).json(allPosts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true });
    }
});

module.exports = router;
