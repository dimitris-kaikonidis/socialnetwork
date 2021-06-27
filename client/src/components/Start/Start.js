import PostContainer from "../../containers/PostContainer/PostContainer";
import MakePost from "../../containers/MakePost/MakePost";
import "./styles.css";


export default function Start() {
    return (
        <div id="start-page">
            <MakePost />
            <PostContainer />
        </div>
    );
}