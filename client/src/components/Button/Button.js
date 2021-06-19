import React from "react";
import "./styles.css";

export default class Button extends React.Component {
    render() {
        const { id, className, name, action, icon, type } = this.props;
        return (
            <div id={id} className={"button " + className} onClick={action}>
                {
                    icon ?
                        <img src={icon} /> :
                        <button type={type}>{name}</button>
                }
            </div>
        );
    }
}