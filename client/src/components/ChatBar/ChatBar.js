import { useSelector } from "react-redux";
import ChatWindow from "../../containers/ChatWindow/ChatWindow";
import "./styles.css";

export default function ChatBar() {
    const id = useSelector(state => state.user && state.user.id);
    const friends = useSelector(state => state.friends);
    const chatWindows = useSelector(state => state.chatWindows);

    return (
        <ul id="chat-bar" >
            {chatWindows.length &&
                friends
                    .filter(friend => chatWindows.includes(friend.sender) || chatWindows.includes(friend.receiver))
                    // .sort((a,b) => {
                    //     if ()
                    // })
                    .map(friend =>
                        <li key={friend.id}>
                            <ChatWindow
                                first={friend.first}
                                last={friend.last}
                                chatWindowId={id === friend.sender ? friend.receiver : friend.sender}
                            />
                        </li>)
            }
        </ul>
    );
}