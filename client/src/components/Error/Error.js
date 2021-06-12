import React, { useState } from "react";
import "./styles.css";

export default class Error extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    componentDidUpdate() {
        this.toggle();
    }

    toggle() {
        if (this.props.error) {
            document.querySelector(".error-msg").classList.remove("hidden");
        } else {
            document.querySelector(".error-msg").classList.add("hidden");
        }
    }

    render() {
        return <h3 className="error-msg hidden"> Something went wrong :/</h3>;
    }
}

