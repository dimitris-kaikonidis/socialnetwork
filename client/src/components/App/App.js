import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "../../utilities/axios";
import OwnProfile from "../OwnProfile/OwnProfile";
import OtherProfile from "../OtherProfile/OtherProfile";
import Loading from "../UI/Loading/Loading";
import Button from "../UI/Button/Button";
import Error from "../UI/Error/Error";
import "./styles.css";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            error: false,
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
                    <BrowserRouter>
                        <>
                            <Route path="/" render={() => <OwnProfile user={user} />} />
                            <Route path="/user/:id" component={OtherProfile} />
                        </>
                    </BrowserRouter>
                </div>
            );
        }
    }
}