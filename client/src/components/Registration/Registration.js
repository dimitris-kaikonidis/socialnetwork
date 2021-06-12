import axios from "axios";
import React, { useState } from "react";
import "./styles.css";
import Error from "../Error/Error";

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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            if (this.state[event.target.name]) {
                document.querySelector(`span.${event.target.name}`).classList.add("full");
            } else {
                document.querySelector(`span.${event.target.name}`).classList.remove("full");
            }
        });

    }

    handleSubmit(event) {
        event.preventDefault();
        const { first, last, email, password } = this.state;
        axios.post("/register", { first, last, email, password })
            .then(res => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                useState({ error: true });
            });
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <div>
                        <input name="first" type="text" value={this.state.first} onChange={this.handleChange} />
                        <span className="first empty">First Name</span>
                    </div>
                    <div>
                        <input name="last" type="text" value={this.state.last} onChange={this.handleChange} />
                        <span className="last empty">Last Name</span>
                    </div>
                    <div>
                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
                        <span className="email empty">Email Address</span>
                    </div>
                    <div>
                        <input name="password" value={this.state.password} onChange={this.handleChange} />
                        <span className="password empty">Password</span>
                    </div>
                    <Error error={this.state.error} />
                    <button type="submit">Register</button>
                </form>
            </>
        );
    }
}