import { useState } from "react";
import { useDispatch } from "react-redux";
import { editBio } from "../../redux/actions";
import Button from "../../components/Button/Button";
import "./styles.css";

export default function Bio({ bio }) {
    const [draft, setDraft] = useState(bio);
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const saveBio = () => {
        dispatch(editBio(draft));
        closeEdit();
    };

    const handleChange = (event) => setDraft(event.target.value);
    const openEdit = () => setEditMode(true);
    const closeEdit = () => setEditMode(false);

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