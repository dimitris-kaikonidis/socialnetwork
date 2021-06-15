import React from "react";
import "./styles.css";
import axios from "../../utilities/axios";
import { Link } from "react-router-dom";
import Error from "../UI/Error/Error";
import InputField from "../UI/InputField/InputField";


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
        axios.post("/api/register", { first, last, email, password })
            .then(res => res.data.error ? this.setState({ error: true }) : location.replace("/"))
            .catch(error => this.setState({ error: true }));
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <InputField name="first" label="First Name" handleInput={this.handleInput} />
                    <InputField name="last" label="Last Name" handleInput={this.handleInput} />
                    <InputField name="email" label="Email Address" type="email" handleInput={this.handleInput} />
                    <InputField name="password" label="Password" type="password" handleInput={this.handleInput} />
                    <Error error={this.state.error} />
                    <button type="submit">Register</button>
                    <h4>Already have an account? Click <Link to="/api/login">here</Link>.</h4>
                </form>
            </>
        );
    }
}