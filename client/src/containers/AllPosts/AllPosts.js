import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import axios from "../../utilities/axios";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import "./styles.css";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [lastId, setLastId] = useState();
    const [more, setMore] = useState(true);
    const id = useSelector(state => state.user && state.user.id);

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api/posts/all?id=${id}`);
            setPosts(response.data);
        })();
    }, []);

    useEffect(() => {
        if (posts.length) (async () => setLastId(posts[posts.length - 1].id))();
    }, [posts]);

    const getNextPosts = async () => {
        if (more) {
            const response = await axios.get(`/api/posts/all?id=${id}&next=${lastId}`);
            if (response.data.length < 5) setMore(false);
            setPosts([...posts, ...response.data]);
        }
    };

    useBottomScrollListener(getNextPosts);

    return (
        <ul id="post-list">
            {posts
                .map(post =>
                    <li key={post.id}>
                        <Link to={`/user/${post.user_id}`} className="user-post">
                            <ProfilePicture pictureUrl={post.profile_picture_url} />
                            <h3>{post.first} {post.last}</h3>
                        </Link>
                        <p>{post.post}</p>
                    </li>
                )}
        </ul>
    );
}