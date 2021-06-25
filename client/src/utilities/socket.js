import { io } from "socket.io-client";
import { addMessage, setMessages, setFriendStatus } from "../redux/actions";

export let socket;

export function init(store, user_Id) {
    if (!socket) {
        socket = io.connect();
        socket.auth = { user_Id };

        socket.on("usersOnline", data => store.dispatch(setFriendStatus(data)));
        socket.on("openChat", data => store.dispatch(setMessages(data)));
        socket.on("chatMessage", data => store.dispatch(addMessage(data)));
    }
}


