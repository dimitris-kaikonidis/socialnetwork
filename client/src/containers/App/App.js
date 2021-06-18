import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "../../utilities/axios";
import OwnProfile from "../OwnProfile/OwnProfile";
import OtherProfile from "../OtherProfile/OtherProfile";
import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar/NavBar";
import Search from "../../components/Search/Search";
import "./styles.css";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            error: false,
        };
    }

    async componentDidMount() {
        const res = await axios.get("/api/user/profile");
        this.setState({ user: res.data.user });
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
                    <BrowserRouter>
                        <>
                            <Route exact path="/" render={() =>
                                <>
                                    <NavBar />
                                    <OwnProfile user={user} />
                                </>
                            } />
                            <Route path="/user/:id" component={OtherProfile} />
                            <Route path="/search" component={Search} />
                        </>
                    </BrowserRouter>
                </div>
            );
        }
    }
}