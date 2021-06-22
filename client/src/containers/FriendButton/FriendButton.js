import "./styles.css";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import axios from "../../utilities/axios";

const NOT_FRIENDS = "not_friends";
const FRIENDS = "friends";
const FRIEND_REQUEST_MADE_BY_ME = "friend_request_made_by_me";
const FRIEND_REQUEST_MADE_TO_ME = "friend_request_made_to";

const ACTION_MAKE_REQUEST = "send";
const ACTION_CANCEL_REQUEST = "cancel";
const ACTION_ACCEPT_REQUEST = "accept";
const ACTION_REFUSE_REQUEST = "refuse";

export default function FriendButton({ targetUserId }) {
    const [status, setStatus] = useState(null);

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
    }, []);

    const sendFriendRequest = async () => {
        try {
            const response = await axios.post(`/api/friends/add?targetUserId=${targetUserId}`);
            const { status } = response.data;
            setStatus(status);
        } catch (error) {
            setStatus(null);
        }
    };

    const deleteFriendRequest = async () => {
        try {
            const response = await axios.post(`/api/friends/delete?targetUserId=${targetUserId}`);
            const { status } = response.data;
            setStatus(status);
        } catch (error) {
            setStatus(null);
        }
    };

    const acceptFriendRequest = async () => {
        try {
            const response = await axios.post(`/api/friends/accept?targetUserId=${targetUserId}`);
            const { status } = response.data;
            setStatus(status);
        } catch (error) {
            setStatus(null);
        }
    };

    switch (status) {
        case NOT_FRIENDS:
            return <Button icon="/assets/add_friend.svg" alt="Add" action={sendFriendRequest} className="friend" />;
        case FRIENDS:
            return <Button icon="/assets/delete_friend.svg" alt="Remove" action={deleteFriendRequest} className="friend" />;
        case FRIEND_REQUEST_MADE_BY_ME:
            return <Button icon="/assets/reject_friend.svg" alt="Cancel" action={deleteFriendRequest} className="friend" />;
        case FRIEND_REQUEST_MADE_TO_ME:
            return (
                <div>
                    <Button
                        id="accept-friend"
                        icon="/assets/accept_friend.svg"
                        alt="Accept"
                        action={acceptFriendRequest}
                        className="friend"
                    />
                    <Button
                        id="reject-friend"
                        icon="/assets/reject_friend.svg"
                        alt="Refuse"
                        action={deleteFriendRequest}
                        className="friend"
                    />
                </div>
            );
        default:
            return null;
    }
}