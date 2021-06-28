const { getSkills, updateSkills } = require("../db/index");
const express = require("express");
const router = express.Router();

router.get("/api/user/skills", async (req, res) => {
    const { id } = req.query;
    try {
        const response = await getSkills(id);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
});

router.post("/api/user/skills/update", async (req, res) => {
    const { id } = req.query;
    const { skills } = req.body;
    try {
        const response = await updateSkills(id, skills);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
});

module.exports = router;