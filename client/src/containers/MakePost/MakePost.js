import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/actions";
import axios from "../../utilities/axios";
import Button from "../../components/Button/Button";
import "./styles.css";

export default function MakePost() {
    const dispatch = useDispatch();
    const [post, setPost] = useState("");
    const id = useSelector(state => state.user && state.user.id);

    const handleInput = (event) => setPost(event.target.value);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (post) {
                const response = await axios.post("/api/posts/post", { id, post });
                dispatch(addPost(response.data));
                setPost("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form id="post-container">
            <div>
                <Button id="post-button" name="Post" action={handleSubmit} />
            </div>
            <textarea
                maxLength="500"
                onChange={handleInput}
                value={post}
                placeholder="What's on your mind?"
            >
            </textarea>
        </form>
    );
}