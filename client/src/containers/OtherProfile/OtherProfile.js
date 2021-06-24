import { useState, useEffect } from "react";
import axios from "../../utilities/axios";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import FriendButton from "../FriendButton/FriendButton";
import Loading from "../../components/Loading/Loading";
import "./styles.css";

export default function OtherProfile(props) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const { id } = props.match.params;

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/api/users/${id}`);
                setUser(response.data.user);
            } catch (error) {
                setError(true);
                props.history.push("/");
            }
        })();
    }, [location.pathname]);

    const { first, last, profile_picture_url, bio } = user || "";

    if (!user) {
        return <Loading />;
    }
    else {
        return (
            <div id="other-profile-page">
                <div id="other-profile">
                    <div id="basic-info">
                        <div>
                            <ProfilePicture pictureUrl={profile_picture_url} />
                            <h1>{first} {last}</h1>
                            <div id="friend-request-buttons">
                                <FriendButton targetUserId={id} />
                            </div>
                        </div>
                        <h3>{bio}</h3>
                    </div>
                </div>
            </div>
        );
    }

}