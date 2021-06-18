import Search from "../Search/Search";
import Button from "../Button/Button";
import axios from "../../utilities/axios";
import "./styles.css";

export default function NavBar(props) {
    const logout = async () => {
        await axios.post("/api/logout");
        window.location.replace("/");
    };

    return (
        <nav>
            <Search />
            <Button id="logout" icon="/assets/logout.png" action={logout} />
        </nav>
    );
}