import { BrowserRouter, Route } from "react-router-dom";
import Registration from "../forms/Registration";
import Login from "../forms/Login";
import PasswordReset from "../forms/PasswordReset";
import Logo from "../../components/Logo/Logo";
import "./styles.css";
import React from "react";

export default class Welcome extends React.Component {
    render() {
        return (
            <div id="welcome">
                <h1>BandMate</h1>
                <Logo />
                <BrowserRouter>
                    <>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/password/reset" component={PasswordReset} />
                    </>
                </BrowserRouter>
                <p>123</p>
            </div>
        );
    }
}