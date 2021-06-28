import { useState } from "react";
import { useDispatch } from "react-redux";
import { editBio } from "../../redux/actions";
import Button from "../../components/Button/Button";
import "./styles.css";

export default function Bio({ bio = "" }) {
    const [draft, setDraft] = useState(bio);
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const saveBio = () => {
        dispatch(editBio(draft));
        closeEdit();
    };
    const cancelChanges = () => {
        setDraft(bio);
        closeEdit();
    };

    const handleChange = (event) => setDraft(event.target.value);
    const openEdit = () => setEditMode(true);
    const closeEdit = () => setEditMode(false);

    return (
        <div id="bio">
            <h4>About me</h4>
            <textarea
                maxLength="222"
                className={editMode ? "on" : null}
                readOnly={!editMode}
                value={draft}
                onChange={handleChange}>
            </textarea>
            {editMode ?
                <>
                    <Button id="save-bio" icon="/assets/save.svg" alt="save" action={saveBio} />
                    <Button id="cancel-bio" icon="/assets/close.svg" alt="cancel changes" action={cancelChanges} />
                </>
                :
                <Button id="edit-bio" icon="/assets/edit.svg" alt="edit bio" action={openEdit} />}
        </div>
    );
}