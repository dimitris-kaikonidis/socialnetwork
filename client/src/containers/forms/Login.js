import React from "react";
import "./styles.css";
import axios from "../../utilities/axios";
import { Link } from "react-router-dom";
import Error from "../../components/Error/Error";
import InputField from "../../components/InputField/InputField";

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
        if (!email || !password) return;
        axios.post("/api/login", { email, password })
            .then(res => res.data.error ? this.setState({ error: true }) : location.replace("/"))
            .catch(error => this.setState({ error: true }));
    }

    render() {
        const { error } = this.state;
        return (
            <>
                <form className="validation" onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <InputField name="email" label="Email Address" type="email" handleInput={this.handleInput} />
                    <InputField name="password" label="Password" type="password" handleInput={this.handleInput} />
                    <Error error={error} />
                    <button type="submit">Login</button>
                    <h4>
                        <p>Don&apos;t have an account?</p>
                        <p>Click <Link to="/">here</Link></p>
                    </h4>
                    <h4>
                        <p>Forgot your password?</p>
                        <p>Click <Link to="/password/reset">here</Link>.</p>
                    </h4>
                </form>
            </>
        );
    }
}