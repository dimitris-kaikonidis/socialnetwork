import PostsContainer from "../PostsContainer/PostsContainer";
import Slides from "../Slides/Slides";
import "./styles.css";

export default function Start() {
    return (
        <div id="start-page">
            <Slides />
            <PostsContainer />
        </div>
    );
}