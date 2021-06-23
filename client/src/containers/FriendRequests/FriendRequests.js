import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequests } from "../../redux/actions";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import FriendButton from "../FriendButton/FriendButton";
import "./styles.css";

export default function FriendRequests() {
    const [visibility, setVisibility] = useState(false);
    const dispatch = useDispatch();
    const id = useSelector(state => state.user && state.user.id);
    const incomingFriendRequests = useSelector(state =>
        state.friendRequests && state.friendRequests.filter(request => request.receiver === id)
    );
    const sentFriendRequests = useSelector(state =>
        state.friendRequests && state.friendRequests.filter(request => request.receiver !== id)
    );

    return (
        <div id="friend-requests">
            <Button
                icon="/assets/friend_requests.svg"
                action={() => {
                    (!incomingFriendRequests || !sentFriendRequests) && dispatch(getFriendRequests(id));
                    setVisibility(!visibility);
                }}
            />
            {visibility
                ?
                <ul id="friend-requests-result">
                    <div className="arrow-up"></div>
                    <div className="border">
                        <div></div>
                        <p>Received Friend Requests</p>
                    </div>
                    {
                        incomingFriendRequests
                            ?
                            incomingFriendRequests.length ?
                                incomingFriendRequests
                                    .map(request =>
                                        <li key={request.id}>
                                            <div>
                                                <ProfilePicture pictureUrl={request.profile_picture_url} />
                                                <p>{request.first} {request.last}</p>
                                            </div>
                                            <FriendButton targetUserId={request.sender} />
                                        </li>
                                    )
                                :
                                <h1>No Friend Requests</h1>
                            :
                            <Loading type="friends-loading" />
                    }
                    <div className="border">
                        <div></div>
                        <p>Sent Friend Requests</p>
                    </div>
                    {
                        sentFriendRequests
                            ?
                            sentFriendRequests.length ?
                                sentFriendRequests
                                    .map(request =>
                                        <li key={request.id}>
                                            <div>
                                                <ProfilePicture pictureUrl={request.profile_picture_url} />
                                                <p>{request.first} {request.last}</p>
                                            </div>
                                            <FriendButton targetUserId={request.receiver} />
                                        </li>
                                    )
                                :
                                <h1>No Friend Requests</h1>
                            :
                            <Loading type="friends-loading" />
                    }
                </ul>
                :
                null
            }
        </div >
    );
}