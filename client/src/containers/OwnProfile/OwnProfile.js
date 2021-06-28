import { useState } from "react";
import { useSelector } from "react-redux";
import Bio from "../Bio/Bio";
import Uploader from "../Uploader/Uploader";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import MusicSkillsBadges from "../../components/MusicSkillsBadges/MusicSkillsBadges";
import "./styles.css";

export default function OwnProfile() {
    const user = useSelector(state => state.user);
    const skills = useSelector(state => state.skills);
    const [uploaderButtonVisibility, setUploaderButtonVisibility] = useState(false);
    const [uploaderVisible, setUploaderVisible] = useState(false);

    const openUpload = () => setUploaderVisible(true);
    const closeUpload = () => setUploaderVisible(false);

    const { first, last, bio, profile_picture_url } = user;
    return (
        <div id="profile" className={uploaderVisible ? "modalOn" : ""}>
            <div id="profile-pic" onMouseEnter={() => setUploaderButtonVisibility(true)}>
                <ProfilePicture pictureUrl={profile_picture_url} />
                <div
                    id="edit-profile-pic"
                    className={uploaderButtonVisibility ? null : "off"}
                    onClick={openUpload}
                    onMouseLeave={() => setUploaderButtonVisibility(false)}
                >
                    <img src={"/assets/edit_profile_pic.svg"} alt="edit profile picture" />
                </div>
            </div>
            <h1>{first} {last}</h1>
            <Bio bio={bio} />
            <MusicSkillsBadges skills={skills} />
            {uploaderVisible && <Uploader closeUpload={closeUpload} />}
        </div>
    );
}