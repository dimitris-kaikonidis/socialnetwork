import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "../../utilities/axios";
import Error from "../Error/Error";
import InputField from "../InputField/InputField";


export default class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            tempPassword: "",
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
        const { email, tempPassword, newPassword } = this.state;
        if (this.state.step === 1) {
            axios
                .post("/password/reset/start.json", { email })
                .then(res => res.data.error ? this.setState({ error: true }) : this.setState({ step: 2 }))
                .catch(error => this.setState({ error: true }));
        } else if (this.state.step === 2) {
            axios
                .post("/password/reset/verify.json", { tempPassword, newPassword })
                .then(res => res.data.error ? this.setState({ error: true }) : this.setState({ step: 3 }))
                .catch(error => this.setState({ error: true }));
        }
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    {this.state.step === 1 &&
                        <>
                            <h1>Password Reset</h1>
                            <InputField name="email" label="Email Address" handleInput={this.handleInput} />
                            <Error error={this.state.error} />
                            <button type="submit">Reset</button>
                            <h4>Click <Link to="/">here</Link> to go back.</h4>
                        </>
                    }
                    {this.state.step === 2 &&
                        <>
                            <h1>Set New Password</h1>
                            <InputField name="tempPassword" label="Temporary Password" handleInput={this.handleInput} />
                            <InputField name="newPassword" label="New Password" handleInput={this.handleInput} />
                            <button type="submit">Reset</button>
                        </>
                    }
                    {(this.state.step === 3 && !this.state.error) &&
                        <>
                            <h1>Success</h1>
                            <h4>Click <Link to="/login.json">here</Link> to login.</h4>
                        </>
                    }
                    {(this.state.step === 3 && this.state.error) &&
                        <>
                            <Error error={this.state.error} />
                            <h4>Click <Link to="/">here</Link> to go back.</h4>
                        </>
                    }
                </form>
            </>
        );
    }
}