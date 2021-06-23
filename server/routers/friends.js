const { checkFriendStatus,
    sendFriendRequest,
    deleteFriendRequest,
    acceptFriendRequest,
    getFriendRequests } = require("../db/index");
const express = require("express");
const router = express.Router();

const NOT_FRIENDS = "not_friends";
const FRIENDS = "friends";
const FRIEND_REQUEST_MADE_BY_ME = "friend_request_made_by_me";
const FRIEND_REQUEST_MADE_TO_ME = "friend_request_made_to";

const ACTION_MAKE_REQUEST = "send";
const ACTION_ACCEPT_REQUEST = "accept";
const ACTION_DELETE_REQUEST = "delete";

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

router.post("/api/friends/:action", async (req, res) => {
    const { id } = req.session.user;
    const { action } = req.params;
    const { targetUserId } = req.query;
    switch (action) {
        case ACTION_MAKE_REQUEST:
            try {
                await sendFriendRequest(id, targetUserId);
                res.status(200).json({ status: FRIEND_REQUEST_MADE_BY_ME });
            } catch (error) {
                console.log(error);
            }
            break;
        case ACTION_ACCEPT_REQUEST:
            try {
                await acceptFriendRequest(id, targetUserId);
                res.status(200).json({ status: FRIENDS });
            } catch (error) {
                console.log(error);
            }
            break;
        case ACTION_DELETE_REQUEST:
            try {
                await deleteFriendRequest(id, targetUserId);
                res.status(200).json({ status: NOT_FRIENDS });
            } catch (error) {
                console.log(error);
            }
            break;
    }
});

router.get("/api/friends/requests", async (req, res) => {
    const { id } = req.query;
    try {
        const response = await getFriendRequests(id);
        const receivedFriendRequests = response.rows;
        res.status(200).json(receivedFriendRequests);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;