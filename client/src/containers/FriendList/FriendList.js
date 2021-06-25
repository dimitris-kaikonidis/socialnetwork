import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChatWindow, getFriends } from "../../redux/actions";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import "./styles.css";

export default function FriendList() {
    const dispatch = useDispatch();
    const myId = useSelector(state => state.user && state.user.id);
    const friends = useSelector(state => state.friends);
    const chatWindows = useSelector(state => state.chatWindows);

    useEffect(() => !friends && dispatch(getFriends()), []);

    const openChat = (event) => {
        const targetId = event.currentTarget.getAttribute("target-id");
        if (chatWindows.includes(parseInt(targetId))) return;
        dispatch(addChatWindow(parseInt(targetId)));
    };

    return (
        <ul id="friend-list">
            {friends && friends.map(friend =>
                <li key={friend.id} onClick={openChat} target-id={myId === friend.sender ? friend.receiver : friend.sender} >
                    <ProfilePicture pictureUrl={friend.profile_picture_url} />
                    <p>{friend.first} {friend.last}</p>
                </li>
            )}
            <span>Friends Online: {friends ? friends.length : 0}</span>
        </ul>
    );
}