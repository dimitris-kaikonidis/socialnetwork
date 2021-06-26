import axios from "../utilities/axios";

export async function setUser() {
    let user;
    try {
        const response = await axios.get("/api/user/profile");
        user = response.data.user;
    } catch (error) {
        user = null;
    }
    return { type: "SET_USER", user };
}

export async function editProfilePic(pictureUrl) {
    let profile_picture_url;
    try {
        const response = await axios.post("/api/user/profile-picture/upload", pictureUrl);
        profile_picture_url = response.data.user.profile_picture_url;
    } catch (error) {
        profile_picture_url = null;
    }
    return { type: "EDIT_PROFILE_PIC", profile_picture_url };
}

export async function editBio(draft) {
    try {
        const response = await axios.post("/api/user/bio/save", { draft });
        const bio = response.data.bio;
        return { type: "EDIT_BIO", bio };
    }
    catch (error) {
        console.log(error);
    }
}

export async function getFriendRequests() {
    let friendRequests = [];
    try {
        const response = await axios.get("/api/friends/requests");
        friendRequests = [...response.data];
    } catch (error) {
        friendRequests = ["Something went wrong :/"];
    }
    return { type: "GET_FRIEND_REQUESTS", friendRequests };
}

export async function getFriends() {
    let friends = [];
    try {
        const response = await axios.get("/api/friends/all");
        friends = [...response.data];
    } catch (error) {
        friends = ["Something went wrong :/"];
    }
    return { type: "GET_FRIENDS", friends };
}

export function addChatWindow(targetId) {
    return { type: "ADD_CHAT_WINDOW", targetId };
}

export function closeChatWindow(targetId) {
    return { type: "CLOSE_CHAT_WINDOW", targetId };
}

export function setMessages(messages) {
    return { type: "SET_MESSAGES", messages };
}

export function addMessage(message) {
    return { type: "ADD_MESSAGE", message };
}

export function setFriendStatus(friendsOnline) {
    return { type: "SET_ONLINE_FRIENDS", friendsOnline };
}
