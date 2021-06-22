import "./styles.css";

export default function ProfilePicture({ pictureUrl, openUpload }) {
    if (!pictureUrl) {
        return (
            <div className="img-container">
                <img id="default-profile-pic" className="profile-pic" src="/assets/default_profile_pic.svg" alt="default profile picture" onClick={openUpload} />
            </div>
        );
    } else {
        return (
            <div className="img-container">
                <img className="profile-pic" src={pictureUrl} onClick={openUpload} alt="profile picture" />
            </div>
        );
    }
}