import axios from "axios";

const instance = axios.create({
    xsrfCookieName: "token",
    xsrfHeaderName: "csrf-token"
});

export default instance;