import React from "react";
import axios from "../../utilities/axios";
import ProfilePicture from "../UI/ProfilePicture/ProfilePicture";

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
            const response = await axios.get(`/api/user/${id}`);
            this.setState({
                user: response.data.user,
            });
        } catch (error) {
            this.setState({ error: true });
        }
    }

    render() {
        const { first, last, profile_picture_url, bio } = this.state.user || "";
        const { error } = this.state;

        if (error) {
            location.replace("/");
        } else {
            return (
                <div>
                    <h1>{first} {last}</h1>
                    <ProfilePicture pictureUrl={profile_picture_url} />
                    <textarea value={bio}></textarea>
                </div>
            );
        }

    }
}