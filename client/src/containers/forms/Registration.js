import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utilities/axios";
import Error from "../../components/Error/Error";
import InputField from "../../components/InputField/InputField";
import "./styles.css";

export default function Registration() {
    const [inputs, setInputs] = useState({
        first: null,
        last: null,
        email: null,
        password: null
    });
    const [error, setError] = useState(false);

    const handleInput = (target, value) => {
        setInputs({
            ...inputs,
            [target]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { first, last, email, password } = inputs;
        if (!first || !last || !email || !password) {
            return;
        } else {
            try {
                await axios.post("/api/register", inputs);
                location.replace("/");
            } catch (error) {
                setError(true);
            }
        }
    };

    return (
        <>
            <form className="validation" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <InputField name="first" label="First Name" handleInput={handleInput} />
                <InputField name="last" label="Last Name" handleInput={handleInput} />
                <InputField name="email" label="Email Address" type="email" handleInput={handleInput} />
                <InputField name="password" label="Password" type="password" handleInput={handleInput} />
                <Error error={error} />
                <button type="submit">Register</button>
                <h4>Already have an account? Click <Link to="/login">here</Link>.</h4>
            </form>
        </>
    );
}