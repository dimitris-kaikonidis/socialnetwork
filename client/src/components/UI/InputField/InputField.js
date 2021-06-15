import React from "react";
import "./styles.css";
import classNames from "classnames";

export default class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            [this.props.name]: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [this.props.name]: event.target.value
        }, () => this.props.handleInput(this.props.name, this.state[this.props.name]));
    }

    render() {
        const spanClass = classNames({
            empty: true,
            full: this.state[this.props.name]
        });
        return (
            <div className="input-field">
                <input
                    name={this.props.name}
                    type={this.props.type || "text"}
                    value={this.props.value}
                    onChange={this.handleChange}
                />
                <span className={spanClass}>{this.props.label}</span>
            </div>
        );
    }
}