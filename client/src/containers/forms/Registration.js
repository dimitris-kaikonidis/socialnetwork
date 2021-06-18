import React from "react";
import "./styles.css";
import axios from "../../utilities/axios";
import { Link } from "react-router-dom";
import Error from "../../components/Error/Error";
import InputField from "../../components/InputField/InputField";


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
        const { error } = this.state;
        return (
            <>
                <form className="validation" onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <InputField name="first" label="First Name" handleInput={this.handleInput} />
                    <InputField name="last" label="Last Name" handleInput={this.handleInput} />
                    <InputField name="email" label="Email Address" type="email" handleInput={this.handleInput} />
                    <InputField name="password" label="Password" type="password" handleInput={this.handleInput} />
                    <Error error={error} />
                    <button type="submit">Register</button>
                    <h4>Already have an account? Click <Link to="/login">here</Link>.</h4>
                </form>
            </>
        );
    }
}