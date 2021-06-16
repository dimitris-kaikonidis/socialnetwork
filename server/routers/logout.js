const express = require("express");
const router = express.Router();

router.post("/api/logout", (req, res) => {
    req.session = null;
    res.json({ success: true });
});

module.exports = router;