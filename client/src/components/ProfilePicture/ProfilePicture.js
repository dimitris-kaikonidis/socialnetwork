import React from "react";
import "./styles.css";

export default class ProfilePicture extends React.Component {

    render() {
        const { pictureUrl, openUpload } = this.props;
        if (!this.props.pictureUrl) {
            return (
                <img className="profile-pic" src="/assets/default_profile_pic.svg" alt="default profile picture" onClick={openUpload} />
            );
        } else {
            return (
                <img className="profile-pic" src={pictureUrl} onClick={openUpload} alt="profile picture" />
            );
        }
    }
}