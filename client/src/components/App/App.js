import React from "react";
import axios from "../../utilities/axios";
import Profile from "../Profile/Profile";
import Loading from "../UI/Loading/Loading";
import Button from "../UI/Button/Button";
import "./styles.css";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            error: "",
        };
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

    async logout() {
        await axios.post("/api/logout");
        window.location.reload();
    }

    render() {
        const { user } = this.state;
        if (!user) {
            return (
                <div>
                    <Loading />
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Welcome, {user.first} !</h1>
                    <Button id="logout" icon="/assets/logout.png" action={this.logout} />
                    <Profile user={user} />
                </div>
            );
        }
    }
}