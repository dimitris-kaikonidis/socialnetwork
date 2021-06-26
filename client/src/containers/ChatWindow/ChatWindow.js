import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeChatWindow, setMessages } from "../../redux/actions";
import { socket } from "../../utilities/socket";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import "./styles.css";


export default function ChatWindow({ friend }) {
    const { first, last, profile_picture_url, user_id } = friend;
    const dispatch = useDispatch();
    const chatRef = useRef();
    const userId = useSelector(state => state.user && state.user.id);
    const messages = useSelector(state =>
        (state.messages && state.messages[user_id]) && state.messages[user_id]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/api/messages?targetId=${user_id}`);
                dispatch(setMessages({ chatWindowId: user_id, messages: response.data }));
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => chatRef.current.scrollTop = chatRef.current.scrollHeight, [messages]);

    const closeWindow = () => dispatch(closeChatWindow(user_id));
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (!event.target.value) return;
            socket.emit("chatMessage", { msg: event.target.value, targetUserId: user_id });
            event.target.value = "";
        }
    };

    return (
        <div className="chat-window">
            <div className="user-info" onClick={closeWindow}>
                <ProfilePicture pictureUrl={profile_picture_url} />
                <p>{first} {last}</p>
                <img
                    className="online-status"
                    src={friend.status ? "/assets/online.svg" : "/assets/offline.svg"}
                    alt={friend.status ? "online" : "offline"}
                />
            </div>
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