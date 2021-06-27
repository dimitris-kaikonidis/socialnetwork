import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import Post from "../../components/Post/Post";
import "./styles.css";

export default function AllPosts() {
    const dispatch = useDispatch();
    const id = useSelector(state => state.user && state.user.id);
    const posts = useSelector(state => state.posts);
    const morePosts = useSelector(state => state.morePosts);
    const [lastPostId, setLastPostId] = useState();

    useEffect(() => posts.length && (async () => setLastPostId(posts[posts.length - 1].id))(), [posts]);
    const getNextPosts = async () => morePosts && dispatch(getPosts(id, lastPostId));

    useBottomScrollListener(getNextPosts);

    return (
        <ul id="post-list">
            {posts
                .filter(post => {
                    if (location.pathname === "/profile") {
                        return id === post.user_id;
                    } else return post;
                })
                .map(post => <li className="post" key={post.id}><Post postProps={post} /></li>)
            }
        </ul>
    );
}