import { io } from "socket.io-client";
import { addMessage, setMessages } from "../redux/actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("openChat", data => store.dispatch(setMessages(data)));
        socket.on("chatMessage", data => store.dispatch(addMessage(data)));

    }
}


