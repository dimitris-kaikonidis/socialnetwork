import React from "react";
import "./styles.css";
import classNames from "classnames";
import Loading from "../Loading/Loading";

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
        const { name, type, value, label, loading } = this.props;
        const spanClass = classNames({
            empty: true,
            full: this.state[name]
        });
        return (
            <div className="input-field">
                <input
                    name={name}
                    type={type || "text"}
                    value={value}
                    onChange={this.handleChange}
                />
                <span className={spanClass}>
                    {label}
                    {loading ? <Loading /> : ""}
                </span>
            </div>
        );
    }
}