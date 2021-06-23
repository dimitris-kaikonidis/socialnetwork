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
        // setError(true);
    }
}

export async function getFriendRequests(id) {
    let friendRequests = [];
    try {
        const response = await axios.get(`/api/friends/requests?id=${id}`);
        friendRequests = [...response.data];
        return { type: "GET_FRIEND_REQUESTS", friendRequests };
    } catch (error) {
        friendRequests = ["Something went wrong :/"];
    }
}