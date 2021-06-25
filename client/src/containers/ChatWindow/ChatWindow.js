
import { useDispatch } from "react-redux";
import { closeChatWindow } from "../../redux/actions";
import "./styles.css";


export default function ChatWindow({ first, last, chatWindowId }) {
    const dispatch = useDispatch();
    const close = () => dispatch(closeChatWindow(chatWindowId));

    return (
        <div className="chat-window">
            <h4 onClick={close}>{first} {last}</h4>
            <ul>
                <li>Hi</li>
            </ul>
            <input />
        </div>
    );

}