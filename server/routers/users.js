const { getUserInfo, findUsers, getRecommended } = require("../db/index");
const express = require("express");
const router = express.Router();

router.get("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (id == req.session.user.id) {
            throw new Error("Visiting Own Profile");
        } else {
            const userInfo = await getUserInfo(id);
            if (!userInfo.rows.length) res.json({ error: true });
            else res.json({ user: userInfo.rows[0] });
        }
    } catch (error) {
        res.status(400).json({ error: true });
    }
});

router.get("/api/search/users", async (req, res) => {
    try {
        const searchResult = await findUsers(req.query.q);
        res.json({ success: true, users: searchResult.rows });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true });
    }
});

router.get("/api/recommended", async (req, res) => {
    const skills = req.query.skills.split(" ");
    try {
        const response = await getRecommended(skills);
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
});

module.exports = router;