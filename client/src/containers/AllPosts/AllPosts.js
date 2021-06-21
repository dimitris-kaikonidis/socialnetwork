import "./styles.css";
import axios from "../../utilities/axios";
import { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

export default function AllPosts({ user }) {
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
            {posts.map(item =>
                <li key={item.id}>
                    <div className="user-post">
                        <img src={user.profile_picture_url} />
                        <h3>{user.first} {user.last}</h3>
                    </div>
                    <p>{item.post}</p>
                </li>
            )}
        </ul>
    );
}