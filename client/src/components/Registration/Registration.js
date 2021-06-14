import axios from "../../utilities/axios";
import React from "react";
import { Link } from "react-router-dom";
import Error from "../Error/Error";
import InputField from "../InputField/InputField";
import "./styles.css";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            error: false
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(target, value) {
        this.setState({
            [target]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { first, last, email, password } = this.state;
        axios.post("/register.json", { first, last, email, password })
            .then(res => {
                if (res.data.error) {
                    this.setState({ error: true });
                } else if (res.data.status === 200) {
                    location.replace("/");
                }
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <>
                <form id="register-form" onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <InputField name="first" label="First Name" handleInput={this.handleInput} />
                    <InputField name="last" label="Last Name" handleInput={this.handleInput} />
                    <InputField name="email" label="Email Address" type="email" handleInput={this.handleInput} />
                    <InputField name="password" label="Password" type="password" handleInput={this.handleInput} />
                    <Error error={this.state.error} />
                    <button type="submit">Register</button>
                    <h4>Already have an account? Click <Link to="/login.json">here</Link> </h4>
                </form>
            </>
        );
    }
}