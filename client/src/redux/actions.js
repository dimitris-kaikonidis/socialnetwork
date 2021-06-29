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

export async function getPosts(id, lastPostId) {
    let posts = [];
    let more = true;
    try {
        let response;
        if (!lastPostId) {
            response = await axios.get(`/api/posts/all?id=${id}`);
        } else {
            response = await axios.get(`/api/posts/all?id=${id}&next=${lastPostId}`);
            if (response.data.length < 5) {
                more = false;
            }
        }
        posts = [...response.data];
    } catch (error) {
        posts = [];
    }
    return { type: "GET_POSTS", posts, more };
}

export function addPost(post) {
    return { type: "ADD_POST", post };
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

export async function setSkills(id) {
    let skills;
    try {
        const response = await axios.get(`/api/user/skills?id=${id}`);
        skills = response.data;
    } catch (error) {
        skills = {};
    }
    return { type: "SET_SKILLS", skills };
}

export async function updateSkills(id, skills) {
    try {
        const response = await axios.post(`/api/user/skills/update?id=${id}`, { skills });
        skills = response.data;
    } catch (error) {
        return;
    }
    return { type: "UPDATE_SKILLS", skills };
}

export function updateLikes(id, likes) {
    return { type: "UPDATE_LIKES", id, likes };
}



