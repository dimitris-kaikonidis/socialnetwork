import AllPosts from "../../containers/AllPosts/AllPosts";
import MakePost from "../../containers/MakePost/MakePost";
import "./styles.css";

export default function PostsContainer() {
    return (
        <div id="posts-container">
            <MakePost />
            <AllPosts />
        </div>
    );
}