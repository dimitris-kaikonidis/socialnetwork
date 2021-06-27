import OwnProfile from "../../containers/OwnProfile/OwnProfile";
import PostsContainer from "../PostsContainer/PostsContainer";
import "./styles.css";

export default function Home() {
    return (
        <div id="home">
            <OwnProfile />
            <PostsContainer />
        </div>
    );
}