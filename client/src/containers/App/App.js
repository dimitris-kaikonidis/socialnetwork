import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "../../utilities/axios";
import Home from "../../components/Home/Home";
import OtherProfile from "../OtherProfile/OtherProfile";
import Loading from "../../components/Loading/Loading";
import Welcome from "../Welcome/Welcome";
import NavBar from "../../components/NavBar/NavBar";
import Start from "../../components/Start/Start";
import "./styles.css";

export default function App() {
    const [user, setUser] = useState(undefined);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/user/profile");
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            }
        })();
    }, []);

    if (user === undefined) {
        return <Loading />;
    } else if (user === null) {
        return <Welcome />;
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