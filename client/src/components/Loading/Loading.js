import "./styles.css";

export default function Loading(props) {
    return <img src="/assets/loading.svg" className={props.type || "loading"} alt="loading" />;
}