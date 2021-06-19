import React from "react";
import axios from "../../utilities/axios";
import Button from "../../components/Button/Button";
import "./styles.css";

export default class Bio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            draft: props.bio,
            editMode: false,
            error: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveBio = this.saveBio.bind(this);
    }

    handleChange(event) {
        this.setState({
            draft: event.target.value
        });
    }

    openEdit() {
        this.setState({
            editMode: true
        });
    }

    closeEdit() {
        this.setState({
            draft: this.props.bio,
            editMode: false
        });
    }

    async saveBio() {
        try {
            const response = await axios.post("/api/user/bio/save", { bio: this.state.draft });
            this.props.saveHandler(response.data.bio);
            this.closeEdit();
        }
        catch (error) {
            this.setState({
                error: true
            });
        }
    }

    render() {
        const { bio } = this.props;
        const { draft, editMode } = this.state;
        if (editMode) {
            return (
                <div id="bio-edit">
                    <Button className="close" icon="./assets/close.svg" action={this.closeEdit} />
                    <textarea maxLength="150" value={draft} onChange={this.handleChange}></textarea>
                    <Button name="Save" action={this.saveBio} />
                </div>
            );
        } else {
            return (
                <div id="bio" >
                    <p>{bio}</p>
                    <Button icon="./assets/edit.svg" action={this.openEdit} />
                </div>
            );
        }
    }
}