import React from "react";
import "./styles.css";

export default class Button extends React.Component {
    render() {
        return (
            <div id={this.props.id} className="button" onClick={this.props.action}>
                {
                    this.props.icon ? <img src={this.props.icon} />
                        : <button type={this.props.type}>{this.props.name}</button>
                }
            </div>
        );
    }
}