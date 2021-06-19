import React from "react";
import axios from "../../utilities/axios";
import Button from "../../components/Button/Button";
import "./styles.css";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            error: false
        };
        this.handleFileChange = this.handleFileChange.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    handleFileChange(event) {
        this.setState({
            file: event.target.files[0]
        });
    }

    uploadFile() {
        const { file } = this.state;
        const formData = new FormData();
        formData.append("file", file);
        axios.post("/api/user/profile-picture/upload", formData)
            .then(res => {
                console.log(res.data);
                this.props.uploadComplete(res.data.user.profile_picture_url);
            })
            .catch(error => console.log(error));
    }

    render() {
        const { file } = this.state;
        return (
            <div id="uploader">
                <Button className="close" icon="./assets/close.svg" action={this.props.closeUpload} />
                <label>
                    <span>{file ? file.name : "Choose File..."}</span>
                    <input id="choose-file" name="file" type="file" accept="image/*" onChange={this.handleFileChange} />
                    <Button id="upload" name="Upload" action={this.uploadFile} />
                </label>
            </div>
        );
    }
}