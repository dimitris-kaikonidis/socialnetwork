import { HashRouter, Route } from "react-router-dom";
import Registration from "../forms/Registration";
import Login from "../forms/Login";
import PasswordReset from "../forms/PasswordReset";
import Logo from "../Logo/Logo";
import "./styles.css";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Bandm8</h1>
            <Logo />
            <HashRouter>
                <>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login.json" component={Login} />
                    <Route path="/password/reset.json" component={PasswordReset} />
                </>
            </HashRouter>
            <p>123</p>
        </div>
    );
}