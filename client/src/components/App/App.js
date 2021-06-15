import React from "react";
import axios from "../../utilities/axios";
import Uploader from "../Uploader/Uploader";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Loading from "../UI/Loading/Loading";
import Button from "../UI/Button/Button";
import "./styles.css";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            error: "",
            uploaderVisible: false,
        };
        this.openUpload = this.openUpload.bind(this);
        this.closeUpload = this.closeUpload.bind(this);
        this.uploadComplete = this.uploadComplete.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        axios.get("/api/user/profile")
            .then(res => {
                this.setState({
                    user: res.data.user
                });
            });
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

    async logout() {
        await axios.post("/api/logout");
        this.setState({ user: null });
    }

    render() {
        if (!this.state.user) {
            return (
                <div>
                    <Loading />
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Welcome, {this.state.user.first} !</h1>
                    <Button id="logout" icon="/assets/logout.png" action={this.logout} />
                    <ProfilePicture
                        pictureUrl={this.state.user.profile_picture_url}
                        openUpload={this.openUpload}
                    />
                    {this.state.uploaderVisible &&
                        <Uploader closeUpload={this.closeUpload} uploadComplete={this.uploadComplete} />}
                </div>
            );
        }
    }
}