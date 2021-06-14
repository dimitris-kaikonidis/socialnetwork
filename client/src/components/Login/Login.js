import axios from "../../utilities/axios";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Error from "../Error/Error";
import InputField from "../InputField/InputField";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const { email, password } = this.state;
        axios.post("/login.json", { email, password })
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
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <InputField name="email" label="Email Address" type="email" handleInput={this.handleInput} />
                    <InputField name="password" label="Password" type="password" handleInput={this.handleInput} />
                    <Error error={this.state.error} />
                    <button type="submit">Login</button>
                    <h4>Already have an account? Click <Link to="/">here</Link> </h4>
                </form>
            </>
        );
    }
}