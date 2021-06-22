import { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "../../utilities/axios";
import Error from "../../components/Error/Error";
import InputField from "../../components/InputField/InputField";

export default function PasswordReset() {
    const [inputs, setInputs] = useState({
        email: null,
        resetCode: null,
        newPassword: null,
    });
    const [error, setError] = useState(false);
    const [step, setStep] = useState(1);

    const handleInput = (target, value) => {
        setInputs({
            ...inputs,
            [target]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, resetCode, newPassword } = inputs;
        if (step === 1 && email) {
            try {
                await axios.post("/api/password/reset/reset", { email });
                setStep(2);
            } catch (error) {
                setError(true);
            }
        }
        else if (step === 2 && resetCode && newPassword) {
            try {
                await axios.post("/api/password/reset/verify", { email, resetCode, newPassword });
                setStep(3);
            } catch (error) {
                setError(true);
            }
        } else return;
    };

    return (
        <>
            <form className="validation" onSubmit={handleSubmit}>
                {step === 1 &&
                    <>
                        <h1>Password Reset</h1>
                        <InputField name="email" label="Email Address" handleInput={handleInput} />
                        <Error error={error} />
                        <button type="submit">Reset</button>
                        <h4>Click <Link to="/">here</Link> to go back.</h4>
                    </>
                }
                {step === 2 &&
                    <>
                        <h1>Set New Password</h1>
                        <InputField name="resetCode" label="Reset Code" handleInput={handleInput} />
                        <InputField name="newPassword" label="New Password" type="password" handleInput={handleInput} />
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