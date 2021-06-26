import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeChatWindow, setMessages } from "../../redux/actions";
import { socket } from "../../utilities/socket";
import "./styles.css";


export default function ChatWindow({ first, last, chatWindowId }) {
    const dispatch = useDispatch();
    const chatRef = useRef();
    const userId = useSelector(state => state.user && state.user.id);
    const messages = useSelector(state =>
        (state.messages && state.messages[chatWindowId]) && state.messages[chatWindowId]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/api/messages?targetId=${chatWindowId}`);
                dispatch(setMessages({ chatWindowId, messages: response.data }));
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => chatRef.current.scrollTop = chatRef.current.scrollHeight, [messages]);

    const closeWindow = () => dispatch(closeChatWindow(chatWindowId));
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (!event.target.value) return;
            socket.emit("chatMessage", { msg: event.target.value, targetUserId: chatWindowId });
            event.target.value = "";
        }
    };

    return (
        <div className="chat-window">
            <h4 onClick={closeWindow}>{first} {last}</h4>
            <ul ref={chatRef}>
                {messages && messages.length
                    ?
                    messages
                        .map(msg =>
                            <li key={msg.id} className={msg.sender == userId ? "right" : "left"}>
                                <p>{msg.msg}</p>
                            </li>
                        )
                    :
                    null
                }
            </ul>
            <textarea onKeyDown={handleEnter} placeholder="Message..."></textarea>
        </div>
    );
}