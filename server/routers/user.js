const fs = require("fs/promises");
const { getUserInfo, updateUserPhoto } = require("../db/index");
const { uploader } = require("../utilities/upload");
const { uploadFile, getS3URL, deleteFile } = require("../utilities/S3");
const express = require("express");
const router = express.Router();

router.get("user/data.json", (req, res) => {
    const { id } = req.session;
    getUserInfo(id)
        .then(result => {
            if (!result.rows.length) {
                res.json({ error: true });
            } else {
                delete result.rows[0].password_hash;
                res.json({ user: result.rows[0] });
            }
        });
});

router.post("/api/user/profile-picture/upload", uploader.single("file"), (req, res) => {
    if (!req.file) {
        res.json({ error: true });
    } else {
        uploadFile(req.file)
            .then(() => {
                fs.rm(__dirname + "/../uploads/" + req.file.filename);
                const url = getS3URL(req.file.filename);
                const { id } = req.session.user;
                updateUserPhoto(id, url)
                    .then(result => {
                        res.status(200).json({ result });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(400).json({ error: true });
                    });
            })
            .catch(error => console.log(error));
    }
});

module.exports = router;