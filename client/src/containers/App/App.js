import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "../../utilities/axios";
import Home from "../../components/Home/Home";
import OtherProfile from "../OtherProfile/OtherProfile";
import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar/NavBar";
import Start from "../../components/Start/Start";
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
            return <Loading />;
        } else {
            return (
                <BrowserRouter>
                    <>
                        <Route path="/" render={() => <NavBar user={user} />} />
                        <Route exact path="/" render={() => <Start user={user} />} />
                        <Route path="/profile" render={() => <Home user={user} />} />
                        <Route path="/user/:id" component={OtherProfile} />
                    </>
                </BrowserRouter>
            );
        }
    }
}