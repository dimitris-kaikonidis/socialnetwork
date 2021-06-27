import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utilities/axios";
import dateFn from "date-fns/format";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Button from "../Button/Button";
import "./styles.css";

export default function Comments({ postId, visibility }) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api/comments/get?postId=${postId}`);
            setComments(response.data);
        })();
    }, []);

    const handleChange = (event) => setComment(event.target.value);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (comment) {
                const response = await axios.post("/api/comments/post", { postId, comment });
                setComments([response.data, ...comments]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (visibility) {
        return (
            <div className="comment-section">
                <ul>
                    {comments
                        .map(comment =>
                            <li key={comment.id}>
                                <Link to={`/user/${comment.user_id}`} className="user-info">
                                    <ProfilePicture pictureUrl={comment.profile_picture_url} />
                                    <div className="post-info">
                                        <h4>{comment.first} {comment.last}</h4>
                                        <p className="created_at">
                                            {dateFn(Date.parse(comment.created_at), "HH:mm P")}
                                        </p>
                                    </div>
                                </Link>
                                <p className="comment">{comment.comment}</p>
                            </li>
                        )
                    }
                </ul>
                <div className="comment-input">
                    <textarea
                        maxLength="200"
                        placeholder="Comment..."
                        name="comment"
                        value={comment}
                        onChange={handleChange}
                    >
                    </textarea>
                    <Button id="post-comment-button" icon="/assets/send.svg" action={handleSubmit} />
                </div>
            </div>
        );
    } else {
        return null;
    }
}