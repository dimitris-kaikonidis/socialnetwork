import "./styles.css";
import axios from "../../utilities/axios";
import { useEffect, useState } from "react";

export default function AllPosts({ user }) {
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const response = await axios.get("/api/posts/all");
        setPosts(response.data);
    }, []);

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