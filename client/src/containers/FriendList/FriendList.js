import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChatWindow, getFriends } from "../../redux/actions";
import { socket } from "../../utilities/socket";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Button from "../../components/Button/Button";
import "./styles.css";

export default function FriendList() {
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friends);
    const [visibility, setVisibility] = useState(false);

    useEffect(() => !friends && dispatch(getFriends()), []);

    const openChat = (event) => {
        const targetId = parseInt(event.currentTarget.getAttribute("target-id"));
        dispatch(addChatWindow(targetId));
        socket.emit("openChat", targetId);
    };

    const showFriendsList = () => setVisibility(true);
    const hideFriendsList = () => setVisibility(false);

    if (visibility) {
        return (
            <ul id="friend-list">
                {friends && friends.map(friend =>
                    <li key={friend.id} onClick={openChat} target-id={friend.user_id} >
                        <ProfilePicture pictureUrl={friend.profile_picture_url} />
                        <p>{friend.first} {friend.last}</p>
                        <img
                            className={friend.status ? "online-status" : "online-status off"}
                            src={friend.status ? "/assets/online.svg" : "/assets/offline.svg"}
                            alt={friend.status ? "online" : "offline"}
                        />
                    </li>
                )}
                <span>Friends Online: {friends && friends.filter(friend => friend.status).length}</span>
                <Button id="close-friends" className="friends-list-vis" icon="/assets/right_arrow.svg" alt="friend list" action={hideFriendsList} />
            </ul>
        );
    } else {
        return (
            <Button className="friends-list-vis" icon="/assets/left_arrow.svg" alt="friend list" action={showFriendsList} />
        );
    }
}