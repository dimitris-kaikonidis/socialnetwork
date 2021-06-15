const express = require("express");
const router = express.Router();

router.post("/api/logout", (req, res) => {
    req.session = null;
    res.redirect("/user/id.json");
});

module.exports = router;