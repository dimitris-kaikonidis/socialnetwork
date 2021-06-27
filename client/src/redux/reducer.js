export default function (state = {}, action) {
    switch (action.type) {
        case "SET_USER":
            state = {
                ...state,
                user: action.user,
                messages: {},
                chatIds: [],
                posts: []
            };
            break;
        case "EDIT_PROFILE_PIC":
            state = {
                ...state,
                user: {
                    ...state.user,
                    profile_picture_url: action.profile_picture_url
                }
            };
            break;
        case "EDIT_BIO":
            state = {
                ...state,
                user: {
                    ...state.user,
                    bio: action.bio
                }
            };
            break;
        case "GET_FRIEND_REQUESTS":
            state = {
                ...state,
                friendRequests: action.friendRequests
            };
            break;
        case "GET_FRIENDS":
            state = {
                ...state,
                friends: action.friends
            };
            break;
        case "GET_POSTS":
            state = {
                ...state,
                posts: [...state.posts, ...action.posts],
                morePosts: action.more
            };
            break;

        case "ADD_POST":
            state = {
                ...state,
                posts: [action.post, ...state.posts]
            };
            break;
        case "ADD_CHAT_WINDOW":
            state.friends.forEach((friend, index) => {
                if (friend.user_id == action.targetId) {
                    state.friends[index].chatWindow = true;
                    state.friends[index].order = new Date();
                }
            });
            state = {
                ...state,
                chatIds: [...state.chatIds, action.targetId]
            };
            break;
        case "CLOSE_CHAT_WINDOW":
            state.friends.forEach((friend, index) => {
                if (friend.user_id == action.targetId) {
                    state.friends[index].chatWindow = false;
                    delete state.friends[index].order;
                }
            });
            state = {
                ...state,
                chatIds: state.chatIds.filter(chatId => chatId != action.targetId)
            };
            break;
        case "SET_MESSAGES":
            state.messages[action.messages.chatWindowId] = action.messages.messages;
            break;
        case "ADD_MESSAGE":
            state.messages[action.message.chatWindowId] = [...state.messages[action.message.chatWindowId], action.message.newMessage];
            break;
        case "SET_ONLINE_FRIENDS":
            state = {
                ...state,
                friends: state.friends.map(friend => {
                    delete friend.status;
                    action.friendsOnline.forEach(friendOnline => {
                        if (friend.user_id == friendOnline) {
                            friend = { ...friend, status: "online" };
                        }
                    });
                    return friend;
                })
            };
    }
    return state;
}