import { HashRouter, Route } from "react-router-dom";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import Logo from "../Logo/Logo";

export default function Welcome() {
    return (
        <div>
            <h1>HI</h1>
            <Logo />
            <HashRouter>
                <>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login.json" component={Login} />
                </>
            </HashRouter>
        </div>
    );
}