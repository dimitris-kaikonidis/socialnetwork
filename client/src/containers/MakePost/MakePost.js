import { useState } from "react";
import axios from "../../utilities/axios";
import Button from "../../components/Button/Button";
import "./styles.css";

export default function MakePost(props) {
    const [post, setPost] = useState("");
    const { id } = props.user;

    const handleInput = (event) => setPost(event.target.value);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/api/posts/post", { id, post });
            setPost("");
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