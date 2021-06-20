import OwnProfile from "../../containers/OwnProfile/OwnProfile";
import MakePost from "../../containers/MakePost/MakePost";
import "./styles.css";

export default function Home({ user }) {
    return (
        <div id="home">
            <OwnProfile user={user} />
            <MakePost user={user} />
        </div>
    );
}