import classNames from "classnames";
import "./styles.css";

export default function Error(props) {
    const errorClass = classNames({
        "error-msg": true,
        hidden: !props.error
    });
    return <h3 className={errorClass}> Something went wrong :/</h3 >;
}

