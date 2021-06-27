const { makePost, getAllPostsFirst, getAllPostsNext, addLike } = require("../db/index");
const express = require("express");
const router = express.Router();

router.post("/api/posts/post", async (req, res) => {
    const { post, id } = req.body;
    try {
        const response = await makePost(post, id);
        const resultingPost = response.rows[0];
        if (!(Array.isArray(resultingPost.likes))) {
            resultingPost.likes = [];
        }
        res.status(200).json(resultingPost);
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
});

router.get("/api/posts/all", async (req, res) => {
    const { id, next } = req.query;
    try {
        let response;
        if (!req.query.next) response = await getAllPostsFirst(id);
        else response = await getAllPostsNext(id, next);
        const allPosts = response.rows
            .map(post => {
                if (!Array.isArray(post.likes)) {
                    post.likes = [];
                }
                return post;
            });
        res.status(200).json(allPosts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true });
    }
});

router.post("/api/posts/like", async (req, res) => {
    const { id } = req.session.user;
    const { postId } = req.query;
    try {
        await addLike(id, postId);
        res.status(200).json();
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
});

module.exports = router;
