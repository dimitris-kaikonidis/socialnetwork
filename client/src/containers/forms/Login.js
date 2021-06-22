import { useState } from "react";
import "./styles.css";
import axios from "../../utilities/axios";
import { Link } from "react-router-dom";
import Error from "../../components/Error/Error";
import InputField from "../../components/InputField/InputField";

export default function Login() {
    const [inputs, setInputs] = useState({ email: null, password: null });
    const [error, setError] = useState(false);

    const handleInput = (target, value) => {
        setInputs({
            ...inputs,
            [target]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = inputs;
        if (!email || !password) return;
        try {
            await axios.post("/api/login", { email, password });
            location.replace("/");
        } catch (error) {
            setError(true);
        }
    };

    return (
        <>
            <form className="validation" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <InputField name="email" label="Email Address" type="email" handleInput={handleInput} />
                <InputField name="password" label="Password" type="password" handleInput={handleInput} />
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
