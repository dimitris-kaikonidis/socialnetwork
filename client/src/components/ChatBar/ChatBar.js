import { useSelector } from "react-redux";
import ChatWindow from "../../containers/ChatWindow/ChatWindow";
import "./styles.css";

export default function ChatBar() {
    const chats = useSelector(state => state.chatIds);
    const friends = useSelector(state => state.friends);

    return (
        <ul id="chat-bar" >
            {friends && friends.length
                ?
                friends
                    .filter(friend => friend.chatWindow)
                    .sort((a, b) => b.order - a.order)
                    .map(friend => <li key={friend.id}><ChatWindow friend={friend} /></li>)
                : null
            }
        </ul>
    );
}