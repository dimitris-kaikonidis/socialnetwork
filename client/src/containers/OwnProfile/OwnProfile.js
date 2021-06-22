import { useState } from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Bio from "../Bio/Bio";
import Uploader from "../Uploader/Uploader";
import "./styles.css";

export default function OwnProfile() {
    const user = useSelector(state => state.user);
    const [uploaderVisible, setUploaderVisible] = useState(false);

    const openUpload = () => setUploaderVisible(true);
    const closeUpload = () => setUploaderVisible(false);

    const { first, last, bio, profile_picture_url } = user;
    return (
        <div id="profile" className={uploaderVisible ? "modalOn" : ""}>
            <ProfilePicture
                pictureUrl={profile_picture_url}
                openUpload={openUpload}
            />
            <h1>{first} {last}</h1>
            {!uploaderVisible && <Bio bio={bio} />}
            {uploaderVisible && <Uploader closeUpload={closeUpload} />}
        </div>
    );
}