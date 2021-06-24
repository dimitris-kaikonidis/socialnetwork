import OwnProfile from "../../containers/OwnProfile/OwnProfile";
import MakePost from "../../containers/MakePost/MakePost";
import AllPosts from "../../containers/AllPosts/AllPosts";
import "./styles.css";

export default function Home() {
    return (
        <div id="home">
            <OwnProfile />
            <div>
                <MakePost />
                <AllPosts />
            </div>
        </div>
    );
}