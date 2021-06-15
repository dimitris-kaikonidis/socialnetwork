import ReactDOM from "react-dom";
import axios from "./utilities/axios";
import App from "./components/App/App";
import Welcome from "./components/Welcome/Welcome";

axios.get("/user/id.json")
    .then(res => {
        if (res.data.id) {
            ReactDOM.render(<App />, document.querySelector("main"));
        } else {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        }
    })
    .catch(error => console.log(error));




