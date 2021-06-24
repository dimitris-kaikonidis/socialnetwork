import OwnProfile from "../../containers/OwnProfile/OwnProfile";
import Start from "../Start/Start";
import "./styles.css";

export default function Home() {
    return (
        <div id="home">
            <OwnProfile />
            <Start />
        </div>
    );
}