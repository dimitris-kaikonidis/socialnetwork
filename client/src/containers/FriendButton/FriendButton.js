import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utilities/axios";
import Button from "../../components/Button/Button";
import "./styles.css";
import { getFriendRequests } from "../../redux/actions";

const NOT_FRIENDS = "not_friends";
const FRIENDS = "friends";
const FRIEND_REQUEST_MADE_BY_ME = "friend_request_made_by_me";
const FRIEND_REQUEST_MADE_TO_ME = "friend_request_made_to";

const ACTION_MAKE_REQUEST = "send";
const ACTION_ACCEPT_REQUEST = "accept";
const ACTION_DELETE_REQUEST = "delete";

export default function FriendButton({ targetUserId }) {
    const [status, setStatus] = useState(null);
    const dispatch = useDispatch();
    const friendRequests = useSelector(state => state.friendRequests);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/api/friends/status?targetUserId=${targetUserId}`);
                const { status } = response.data;
                setStatus(status);
            } catch (error) {
                setStatus(null);
            }
        })();
    }, [targetUserId, friendRequests]);

    useEffect(() => dispatch(getFriendRequests()), [status]);

    const friendRequestAction = async (action) => {
        try {
            const response = await axios.post(`/api/friends/${action}?targetUserId=${targetUserId}`);
            const { status } = response.data;
            setStatus(status);
        } catch (error) {
            setStatus(null);
        }
    };

    switch (status) {
        case NOT_FRIENDS:
            return <Button
                icon="/assets/add_friend.svg"
                alt="Add"
                action={() => friendRequestAction(ACTION_MAKE_REQUEST)}
                className="friend"
            />;
        case FRIENDS:
            return <Button
                icon="/assets/delete_friend.svg"
                alt="Remove"
                action={() => friendRequestAction(ACTION_DELETE_REQUEST)}
                className="friend"
            />;
        case FRIEND_REQUEST_MADE_BY_ME:
            return <Button
                icon="/assets/reject_friend.svg"
                alt="Cancel"
                action={() => friendRequestAction(ACTION_DELETE_REQUEST)}
                className="friend"
            />;
        case FRIEND_REQUEST_MADE_TO_ME:
            return (
                <>
                    <Button
                        icon="/assets/accept_friend.svg"
                        alt="Accept"
                        action={() => friendRequestAction(ACTION_ACCEPT_REQUEST)}
                        className="friend"
                    />
                    <Button
                        icon="/assets/reject_friend.svg"
                        alt="Refuse"
                        action={() => friendRequestAction(ACTION_DELETE_REQUEST)}
                        className="friend"
                    />
                </>
            );
        default:
            return <Button
                icon="/assets/add_friend.svg"
                alt="Add"
                action={() => friendRequestAction(ACTION_MAKE_REQUEST)}
                className="friend"
            />;
    }
}