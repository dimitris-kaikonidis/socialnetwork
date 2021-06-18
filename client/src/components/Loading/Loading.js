import React from "react";
import "./styles.css";

export default class Loading extends React.Component {
    render() {
        return <img src="/assets/loading.svg" className="loading" alt="loading" />;
    }
}