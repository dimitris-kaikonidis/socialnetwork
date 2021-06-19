import Search from "../Search/Search";
import Button from "../Button/Button";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import axios from "../../utilities/axios";
import "./styles.css";
import { Link } from "react-router-dom";

export default function NavBar(props) {
    const { profile_picture_url } = props.user;

    const logout = async () => {
        await axios.post("/api/logout");
        window.location.replace("/");
    };

    return (
        <nav>
            {window.location.pathname === "/" &&
                <Link to="/profile">
                    <ProfilePicture pictureUrl={profile_picture_url} />
                </Link>
            }
            {window.location.pathname === "/profile" &&
                <Link to="/">
                    <Button id="home" icon="./assets/home.svg" alt="home" />
                </Link>
            }
            <Search />
            <Button id="logout" icon="/assets/logout.svg" alt="logout" action={logout} />
        </nav>
    );
}