export default function (state = {}, action) {
    switch (action.type) {
        case "SET_USER":
            state = {
                ...state,
                user: action.user
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

    }
    return state;
}