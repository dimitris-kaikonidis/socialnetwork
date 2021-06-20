import React from "react";
import axios from "../../utilities/axios";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Loading from "../../components/Loading/Loading";
import "./styles.css";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: false
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const response = await axios.get(`/api/users/${id}`);
            this.setState({ user: response.data.user });
        } catch (error) {
            this.setState({ error: true });
            this.props.history.push("/");
        }
    }

    render() {
        const { first, last, profile_picture_url, bio } = this.state.user || "";
        const { user } = this.state;
        if (!user) {
            return <Loading />;
        }
        else {
            return (
                <div id="other-profile">
                    <ProfilePicture pictureUrl={profile_picture_url} />
                    <div id="basic-info">
                        <h1>{first} {last}</h1>
                        <h3>{bio}</h3>
                    </div>
                </div>
            );
        }
    }
}