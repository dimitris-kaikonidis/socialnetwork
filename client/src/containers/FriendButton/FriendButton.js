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
            return <Button name="Add" action={sendFriendRequest} />;
        case FRIENDS:
            return <Button name="Remove" action={deleteFriendRequest} />;
        case FRIEND_REQUEST_MADE_BY_ME:
            return <Button name="Cancel" action={deleteFriendRequest} />;
        case FRIEND_REQUEST_MADE_TO_ME:
            return (
                <div>
                    <Button name="Accept" action={acceptFriendRequest} />
                    <Button name="Refuse" action={deleteFriendRequest} />
                </div>
            );
        default:
            return null;
    }
}