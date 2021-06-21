import "./styles.css";
import axios from "../../utilities/axios";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [lastId, setLastId] = useState();
    const [more, setMore] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/posts/all");
            setPosts(response.data);
        })();
    }, []);

    useEffect(() => (async () => setLastId(posts[posts.length - 1].id))(), [posts]);

    const getNextPosts = async () => {
        if (more) {
            const response = await axios.get(`/api/posts/all?next=${lastId}`);
            if (response.data.length < 5) setMore(false);
            setPosts([...posts, ...response.data]);
        }
    };

    useBottomScrollListener(getNextPosts);

    return (
        <ul id="post-list">
            {posts.map(post =>
                <li key={post.id}>
                    <div className="user-post">
                        <ProfilePicture pictureUrl={post.profile_picture_url} />
                        <h3>{post.first} {post.last}</h3>
                    </div>
                    <p>{post.post}</p>
                </li>
            )}
        </ul>
    );
}