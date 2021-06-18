import React from "react";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Bio from "../Bio/Bio";
import Uploader from "../Uploader/Uploader";

export default class OwnProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            uploaderVisible: false
        };
        this.openUpload = this.openUpload.bind(this);
        this.closeUpload = this.closeUpload.bind(this);
        this.uploadComplete = this.uploadComplete.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }

    openUpload() {
        this.setState({
            uploaderVisible: true
        });
    }

    closeUpload() {
        this.setState({
            uploaderVisible: false
        });
    }

    uploadComplete(url) {
        this.setState({
            user: {
                ...this.state.user,
                profile_picture_url: url
            }
        });
    }

    saveHandler(bio) {
        this.setState({
            user: {
                ...this.user,
                bio
            }
        });
    }

    render() {
        const { first, last, bio, profile_picture_url } = this.state.user;
        const { uploaderVisible } = this.state;
        return (
            <div id="profile">
                <ProfilePicture
                    pictureUrl={profile_picture_url}
                    openUpload={this.openUpload}
                />
                <h1>{first} {last}</h1>
                <Bio bio={bio} saveHandler={this.saveHandler} />
                {uploaderVisible &&
                    <Uploader closeUpload={this.closeUpload} uploadComplete={this.uploadComplete} />}
            </div>
        );
    }
}