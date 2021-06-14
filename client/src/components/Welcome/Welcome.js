import { HashRouter, Route } from "react-router-dom";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
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
                </>
            </HashRouter>
            <p>123</p>
        </div>
    );
}