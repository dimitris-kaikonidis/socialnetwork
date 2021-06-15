import React from "react";
import axios from "../../utilities/axios";
import Uploader from "../Uploader/Uploader";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <Uploader />
            </div>
        );
    }
}