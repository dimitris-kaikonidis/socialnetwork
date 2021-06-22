import OwnProfile from "../../containers/OwnProfile/OwnProfile";
import MakePost from "../../containers/MakePost/MakePost";
import "./styles.css";

export default function Home() {
    return (
        <div id="home">
            <OwnProfile />
            <MakePost />
        </div>
    );
}