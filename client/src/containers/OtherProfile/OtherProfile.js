import { useState, useEffect } from "react";
import axios from "../../utilities/axios";
import AllPosts from "../AllPosts/AllPosts";
import FriendButton from "../FriendButton/FriendButton";
import MusicSkillsBadges from "../../components/MusicSkillsBadges/MusicSkillsBadges";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";

import Loading from "../../components/Loading/Loading";
import "./styles.css";

export default function OtherProfile(props) {
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState({});
    const { id } = props.match.params;

    useEffect(() => {
        (async () => {
            try {
                const response1 = await axios.get(`/api/users/${id}`);
                setUser(response1.data.user);
                const response2 = await axios.get(`/api/user/skills?id=${id}`);
                setSkills(response2.data);
            } catch (error) {
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
                            <div>
                                <h1>{first} {last}</h1>
                                <MusicSkillsBadges skills={skills} />
                            </div>
                            <div className="friend-request-buttons">
                                <FriendButton targetUserId={id} />
                            </div>
                        </div>
                        <h3>{bio}</h3>
                    </div>
                </div>
                <AllPosts targetUserId={id} />
            </div>
        );
    }

}