import { useState } from "react";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Bio from "../Bio/Bio";
import Uploader from "../Uploader/Uploader";
import "./styles.css";

export default function OwnProfile(props) {
    const [user, setUser] = useState(props.user);
    const [uploaderVisible, setUploaderVisible] = useState(false);

    const openUpload = () => setUploaderVisible(true);
    const closeUpload = () => setUploaderVisible(false);

    const uploadComplete = (url) => {
        setUser({
            ...user,
            profile_picture_url: url
        });
    };

    const saveHandler = (bio) => {
        setUser({
            ...user,
            bio
        });
    };

    const { first, last, bio, profile_picture_url } = user;
    return (
        <div id="profile" className={uploaderVisible ? "modalOn" : ""}>
            <ProfilePicture
                pictureUrl={profile_picture_url}
                openUpload={openUpload}
            />
            <h1>{first} {last}</h1>
            {!uploaderVisible && <Bio bio={bio} saveHandler={saveHandler} />}
            {uploaderVisible && <Uploader closeUpload={closeUpload} uploadComplete={uploadComplete} />}
        </div>
    );
}