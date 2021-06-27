import { BrowserRouter, Route } from "react-router-dom";
import Registration from "../../containers/forms/Registration";
import Login from "../../containers/forms/Login";
import PasswordReset from "../../containers/forms/PasswordReset";
import Logo from "../Logo/Logo";
import "./styles.css";

export default function Welcome() {
    return (
        <div id="welcome">
            <div className="header">
                <h1>BandMate</h1>
                <Logo />
            </div>
            <div id="main-welcome">
                <p>Let&apos;s Jam</p>
                <BrowserRouter>
                    <>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/password/reset" component={PasswordReset} />
                    </>
                </BrowserRouter>
            </div>
        </div>
    );
}