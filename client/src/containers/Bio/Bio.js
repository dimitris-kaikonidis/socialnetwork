import { useState } from "react";
import axios from "../../utilities/axios";
import Button from "../../components/Button/Button";
import "./styles.css";

export default function Bio({ bio, saveHandler }) {
    const [draft, setDraft] = useState(bio);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (event) => setDraft(event.target.value);
    const openEdit = () => setEditMode(true);
    const closeEdit = () => setEditMode(false);

    const saveBio = async () => {
        try {
            const response = await axios.post("/api/user/bio/save", { bio: draft });
            saveHandler(response.data.bio);
            closeEdit();
        }
        catch (error) {
            setError(true);
        }
    };

    if (editMode) {
        return (
            <div id="bio-edit">
                <Button className="close" icon="./assets/close.svg" action={closeEdit} />
                <textarea maxLength="150" value={draft} onChange={handleChange}></textarea>
                <Button name="Save" action={saveBio} />
            </div>
        );
    } else {
        return (
            <div id="bio" >
                <p>{bio}</p>
                <Button icon="./assets/edit.svg" action={openEdit} />
            </div>
        );
    }

}