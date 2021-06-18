import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "../../utilities/axios";
import Error from "../../components/Error/Error";
import InputField from "../../components/InputField/InputField";

export default class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            resetCode: "",
            newPassword: "",
            step: 1,
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
        const { email, resetCode, newPassword } = this.state;
        if (this.state.step === 1) {
            axios
                .post("/api/password/reset/reset", { email })
                .then(res => res.data.error ? this.setState({ error: true }) : this.setState({ step: 2 }))
                .catch(error => this.setState({ error: true }));
        } else if (this.state.step === 2) {
            axios
                .post("/api/password/reset/verify", { email, resetCode, newPassword })
                .then(res => res.data.error ? this.setState({ error: true }) : this.setState({ step: 3 }))
                .catch(error => this.setState({ error: true }));
        }
    }

    render() {
        const { step, error } = this.state;
        return (
            <>
                <form className="validation" onSubmit={this.handleSubmit}>
                    {step === 1 &&
                        <>
                            <h1>Password Reset</h1>
                            <InputField name="email" label="Email Address" handleInput={this.handleInput} />
                            <Error error={error} />
                            <button type="submit">Reset</button>
                            <h4>Click <Link to="/">here</Link> to go back.</h4>
                        </>
                    }
                    {step === 2 &&
                        <>
                            <h1>Set New Password</h1>
                            <InputField name="resetCode" label="Reset Code" handleInput={this.handleInput} />
                            <InputField name="newPassword" label="New Password" type="password" handleInput={this.handleInput} />
                            <Error error={error} />
                            <button type="submit">Reset</button>
                        </>
                    }
                    {(step === 3 && !error) &&
                        <>
                            <h1>Success</h1>
                            <h4>Click <Link to="/login">here</Link> to login.</h4>
                        </>
                    }
                    {(step === 3 && error) &&
                        <>
                            <Error error={error} />
                            <h4>Click <Link to="/">here</Link> to go back.</h4>
                        </>
                    }
                </form>
            </>
        );
    }
}