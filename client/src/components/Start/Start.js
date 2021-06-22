import AllPosts from "../../containers/AllPosts/AllPosts";
import MakePost from "../../containers/MakePost/MakePost";
import "./styles.css";


export default function Start() {
    return (
        <div id="start-page">
            <MakePost />
            <AllPosts />
        </div>
    );
}