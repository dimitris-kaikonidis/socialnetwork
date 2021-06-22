const { checkFriendStatus,
    sendFriendRequest,
    deleteFriendRequest,
    acceptFriendRequest,
    getReceivedFriendRequests } = require("../db/index");
const express = require("express");
const router = express.Router();

const NOT_FRIENDS = "not_friends";
const FRIENDS = "friends";
const FRIEND_REQUEST_MADE_BY_ME = "friend_request_made_by_me";
const FRIEND_REQUEST_MADE_TO_ME = "friend_request_made_to";

const ACTION_MAKE_REQUEST = "send";
const ACTION_CANCEL_REQUEST = "cancel";
const ACTION_ACCEPT_REQUEST = "accept";
const ACTION_REFUSE_REQUEST = "refuse";

router.get("/api/friends/status", async (req, res) => {
    const { id } = req.session.user;
    const { targetUserId } = req.query;
    try {
        const response = await checkFriendStatus(id, targetUserId);
        const friendRequest = response.rows[0] || null;
        let status;
        if (friendRequest === null) {
            status = NOT_FRIENDS;
        } else {
            if (friendRequest.status) {
                status = FRIENDS;
            } else if (friendRequest.sender === id) {
                status = FRIEND_REQUEST_MADE_BY_ME;
            } else if (friendRequest.sender !== id) {
                status = FRIEND_REQUEST_MADE_TO_ME;
            } else {
                status = NOT_FRIENDS;
            }
        }
        res.status(200).json({ status });
    } catch (error) {
        console.log(error);
    }
});

router.post("/api/friends/add", async (req, res) => {
    const { id } = req.session.user;
    const { targetUserId } = req.query;
    try {
        await sendFriendRequest(id, targetUserId);
        res.status(200).json({ status: FRIEND_REQUEST_MADE_BY_ME });
    } catch (error) {
        console.log(error);
    }
});

router.post("/api/friends/delete", async (req, res) => {
    const { id } = req.session.user;
    const { targetUserId } = req.query;
    try {
        await deleteFriendRequest(id, targetUserId);
        res.status(200).json({ status: NOT_FRIENDS });
    } catch (error) {
        console.log(error);
    }
});

router.post("/api/friends/accept", async (req, res) => {
    const { id } = req.session.user;
    const { targetUserId } = req.query;
    try {
        await acceptFriendRequest(id, targetUserId);
        res.status(200).json({ status: FRIENDS });
    } catch (error) {
        console.log(error);
    }
});

router.get("/api/friends/requests", async (req, res) => {
    const { id } = req.query;
    try {
        const response = await getReceivedFriendRequests(id);
        const receivedFriendRequests = response.rows;
        res.status(200).json(receivedFriendRequests);
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;