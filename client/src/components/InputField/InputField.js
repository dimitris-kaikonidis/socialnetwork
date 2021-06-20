import { useEffect, useState } from "react";
import "./styles.css";
import classNames from "classnames";
import Loading from "../Loading/Loading";

export default function InputField(props) {
    const [state, setState] = useState({ [props.name]: "" });

    const handleChange = (event) => setState({ [props.name]: event.target.value });
    useEffect(() => props.handleInput(props.name, state[props.name]), [state]);

    const { name, type, value, label, loading, handleBlur, handleFocus } = props;
    const spanClass = classNames({
        empty: true,
        full: state[name],
    });

    return (
        <div className="input-field" >
            <input
                id={name}
                name={name}
                type={type || "text"}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <span className={spanClass}>
                {label}
                {loading ? <Loading type="input" /> : ""}
            </span>
        </div >
    );

}