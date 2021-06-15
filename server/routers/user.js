const fs = require("fs/promises");
const { getUserInfo, updateUserPhoto } = require("../db/index");
const { uploader } = require("../utilities/upload");
const { uploadFile, getS3URL, deleteFile } = require("../utilities/S3");
const express = require("express");
const router = express.Router();

router.get("/api/user/profile", async (req, res) => {
    const { id } = req.session.user;
    try {
        const userInfo = await getUserInfo(id);
        if (!userInfo.rows.length) res.json({ error: true });
        else {
            delete userInfo.rows[0].password_hash;
            res.json({ user: userInfo.rows[0] });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true });
    }

});

router.post("/api/user/profile-picture/upload", uploader.single("file"), async (req, res) => {
    if (!req.file) {
        res.json({ error: true });
    } else {
        try {
            await uploadFile(req.file);
            fs.rm(__dirname + "/../uploads/" + req.file.filename);
            const url = getS3URL(req.file.filename);
            const { id } = req.session.user;
            const updatedUserInfo = await updateUserPhoto(id, url);
            res.status(200).json({ user: updatedUserInfo.rows[0] });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: true });
        }
    }
});

module.exports = router;