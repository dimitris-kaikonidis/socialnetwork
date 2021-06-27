import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getPosts, getFriendRequests } from "../../redux/actions";
import { init } from "../../utilities/socket";
import Welcome from "../Welcome/Welcome";
import Start from "../../components/Start/Start";
import Home from "../../components/Home/Home";
import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar/NavBar";
import ChatBar from "../../components/ChatBar/ChatBar";
import OtherProfile from "../OtherProfile/OtherProfile";
import FriendList from "../FriendList/FriendList";
import "./styles.css";

export default function App({ store }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        !user && dispatch(setUser());
        dispatch(getFriendRequests(), []);
    }, []);
    useEffect(() => user && dispatch(getPosts(user.id)), [user]);


    if (user === undefined) {
        return <Loading />;
    } else if (user === null) {
        return <Welcome />;
    } else {
        init(store, user.id);
        return (
            <BrowserRouter>
                <>
                    <Route path="/" render={() =>
                        <>
                            <NavBar />
                            <FriendList />
                            <ChatBar />
                        </>
                    } />
                    <Route exact path="/" component={Start} />
                    <Route path="/profile" component={Home} />
                    <Route path="/user/:id" component={OtherProfile} />
                </>
            </BrowserRouter>
        );
    }
}