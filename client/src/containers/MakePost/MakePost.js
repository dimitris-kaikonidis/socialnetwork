import { useState } from "react";
import axios from "../../utilities/axios";
import Button from "../../components/Button/Button";
import "./styles.css";
import { useSelector } from "react-redux";

export default function MakePost() {
    const [post, setPost] = useState("");
    const id = useSelector(state => state.user && state.user.id);

    const handleInput = (event) => setPost(event.target.value);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (post) {
                await axios.post("/api/posts/post", { id, post });
                setPost("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form id="post-container">
            <div>
                <h2>What&apos;s on your mind?</h2>
                <Button id="post-button" name="Post" action={handleSubmit} />
            </div>
            <textarea onChange={handleInput} value={post}></textarea>
        </form>
    );
}