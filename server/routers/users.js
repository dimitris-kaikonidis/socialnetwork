const { getUserInfo, findUsers } = require("../db/index");
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
            else {
                delete userInfo.rows[0].password_hash;
                res.json({ user: userInfo.rows[0] });
            }
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

module.exports = router;