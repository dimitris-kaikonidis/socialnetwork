import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChatWindow, getFriends } from "../../redux/actions";
import { socket } from "../../utilities/socket";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import "./styles.css";

export default function FriendList() {
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friends);

    useEffect(() => !friends && dispatch(getFriends()), []);

    const openChat = (event) => {
        const targetId = parseInt(event.currentTarget.getAttribute("target-id"));
        dispatch(addChatWindow(targetId));
        socket.emit("openChat", targetId);
    };

    return (
        <ul id="friend-list">
            {friends && friends.map(friend =>
                <li key={friend.id} onClick={openChat} target-id={friend.user_id} >
                    <ProfilePicture pictureUrl={friend.profile_picture_url} />
                    <p>{friend.first} {friend.last}</p>
                    <img
                        className="online-status"
                        src={friend.status ? "/assets/online.svg" : "/assets/offline.svg"}
                        alt={friend.status ? "online" : "offline"}
                    />
                </li>
            )}
            <span>Friends Online: {friends ? friends.length : 0}</span>
        </ul>
    );
}