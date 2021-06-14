import ReactDOM from "react-dom";
import axios from "./utilities/axios";
import Logo from "./components/Logo/Logo";
import Welcome from "./components/Welcome/Welcome";

axios.get("/user/id.json")
    .then(res => {
        if (res.data.id) {
            ReactDOM.render(<Logo />, document.querySelector("main"));
        } else {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        }
    })
    .catch(error => console.log(error));




