import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLikes } from "../../redux/actions";
import dateFn from "date-fns/format";
import axios from "../../utilities/axios";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Button from "../../components/Button/Button";
import Comments from "../Comments/Comments";
import "./styles.css";

export default function Post({ postProps }) {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.user && state.user.id);
    const { id, user_id, first, last, profile_picture_url, post, likes, comment_count, created_at } = postProps;
    const [likeNum, setLikeNum] = useState(likes.length);
    const [commentVisibility, setCommentVisility] = useState(false);

    const like = async () => {
        if (likes.indexOf(currentUserId) == -1)
            try {
                const response = await axios.post(`/api/posts/like?postId=${id}`);
                dispatch(updateLikes(id, response.data));
                setLikeNum(likeNum + 1);
            } catch (error) {
                console.log(error);
            }
    };

    const toggleComments = () => setCommentVisility(!commentVisibility);

    return (
        <>
            <Link to={`/user/${user_id}`} className="user-info">
                <ProfilePicture pictureUrl={profile_picture_url} />
                <div className="post-info">
                    <h4>{first} {last}</h4>
                    <p className="created_at">
                        {dateFn(Date.parse(created_at), "HH:mm P")}
                    </p>
                </div>
            </Link>
            <p>{post}</p>
            <div className="interactions">
                <div className="likes">
                    <p>{likeNum}</p>
                    <Button icon="/assets/like.svg" alt="like" action={like} />
                </div>
                <div className="comments">
                    <p>{comment_count}</p>
                    <Button icon="/assets/comment.svg" alt="comment" action={toggleComments} />
                </div>
            </div>
            <Comments postId={id} visibility={commentVisibility} />
        </>
    );
}