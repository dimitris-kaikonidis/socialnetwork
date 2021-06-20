import "./styles.css";
import MakePost from "../../containers/MakePost/MakePost";
import AllPosts from "../../containers/AllPosts/AllPosts";

export default function Start({ user }) {
    return (
        <div id="start-page">
            <MakePost user={user} />
            <AllPosts user={user} />
        </div>
    );
}