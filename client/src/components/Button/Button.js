import "./styles.css";

export default function Button(props) {
    const { id, className, name, action, icon, type, alt } = props;
    return (
        <div id={id} className={"button " + className} onClick={action}>
            {
                icon ?
                    <img src={icon} alt={alt} /> :
                    <button type={type}>{name}</button>
            }
        </div>
    );
}