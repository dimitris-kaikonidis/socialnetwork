import React from "react";
import classNames from "classnames";
import "./styles.css";

export default class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const errorClass = classNames({
            "error-msg": true,
            hidden: !this.props.error
        });
        return <h3 className={errorClass}> Something went wrong :/</h3>;
    }
}

