import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import FriendButton from "../FriendButton/FriendButton";
import "./styles.css";

export default function FriendRequests() {
    const [visibility, setVisibility] = useState(false);
    const [justBlurred, setJustBlurred] = useState(false);
    const id = useSelector(state => state.user && state.user.id);
    const reqRef = useRef();

    const incomingFriendRequests = useSelector(state =>
        state.friendRequests && state.friendRequests.filter(request => request.receiver === id)
    );
    const sentFriendRequests = useSelector(state =>
        state.friendRequests && state.friendRequests.filter(request => request.receiver !== id)
    );

    useEffect(() => {
        if (reqRef.current && visibility) {
            reqRef.current.focus();
        }
    }, [visibility]);

    const toggleVisibility = () => {
        if (justBlurred) {
            setJustBlurred(false);
            return;
        }
        setVisibility(true);
    };
    const handleBlur = () => {
        if (reqRef.current.contains(event.relatedTarget)) return;
        setVisibility(false);
        setJustBlurred(true);
    };

    return (
        <div id="friend-requests" onBlur={handleBlur}>
            <span className={
                (incomingFriendRequests && sentFriendRequests) &&
                    (incomingFriendRequests.length || sentFriendRequests.length) ? "" : "zero"
            }
            >
                {incomingFriendRequests && sentFriendRequests ?
                    incomingFriendRequests.length + sentFriendRequests.length : null
                }
            </span>
            <Button
                icon="/assets/friend_requests.svg"
                action={toggleVisibility}
            />
            {visibility
                ?
                <ul id="friend-requests-result" tabIndex="1" ref={reqRef}>
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
                                            <div className="friend-request-buttons">
                                                <FriendButton targetUserId={request.sender} />
                                            </div>
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
                                            <div className="friend-request-buttons">
                                                <FriendButton targetUserId={request.receiver} />
                                            </div>
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