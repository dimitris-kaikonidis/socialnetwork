import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeChatWindow } from "../../redux/actions";
import { socket } from "../../utilities/socket";
import "./styles.css";


export default function ChatWindow({ first, last, chatWindowId }) {
    const dispatch = useDispatch();
    const chatRef = useRef();
    const userId = useSelector(state => state.user && state.user.id);
    const messages = useSelector(state =>
        state.messages
            .filter(msg =>
                msg.sender == userId && msg.receiver == chatWindowId
                ||
                msg.sender == chatWindowId && msg.receiver == userId
            )
    );

    useEffect(() => chatRef.current.scrollTop = chatRef.current.scrollHeight, [messages]);

    const closeWindow = () => dispatch(closeChatWindow(chatWindowId));
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            socket.emit("chatMessage", { msg: event.target.value, targetUserId: chatWindowId });
            event.target.value = "";
        }
    };

    return (
        <div className="chat-window">
            <h4 onClick={closeWindow}>{first} {last}</h4>
            <ul ref={chatRef}>
                {messages.length
                    ?
                    messages.map(msg =>
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