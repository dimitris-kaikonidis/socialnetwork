export default function (state = {}, action) {
    switch (action.type) {
        case "SET_USER":
            state = {
                ...state,
                user: action.user,
                chatWindows: [],
                messages: []
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
        case "ADD_CHAT_WINDOW":
            state = {
                ...state,
                chatWindows: [...state.chatWindows.filter(chat => chat != action.newChatWindow), action.newChatWindow]
            };
            break;
        case "CLOSE_CHAT_WINDOW":
            state = {
                ...state,
                chatWindows: state.chatWindows.filter(chat => chat != action.closeChatWindow),
                messages: state.messages
                    .filter(message =>
                        message.sender != action.closeChatWindow && message.receiver != action.closeChatWindow
                    )
            };
            break;
        case "SET_MESSAGES":
            state = {
                ...state,
                messages: [...state.messages, ...action.messages]
            };
            break;
        case "ADD_MESSAGE":
            state = {
                ...state,
                messages: [...state.messages, action.message]
            };
            break;
    }
    return state;
}