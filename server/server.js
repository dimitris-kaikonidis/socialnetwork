const chalk = require("chalk");
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const sessionSecret = require("./secrets.json").SESSION_SECRET;
const express = require("express");

//Routers
const register = require("./routers/register");
const login = require("./routers/login");
const logout = require("./routers/logout");
const reset = require("./routers/reset");
const user = require("./routers/user");


const app = express();

//Middlewares
app.use(compression());
app.use(cookieSession({
    secret: sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 30
}));
app.use(express.json());
app.use(csurf());
app.use((req, res, next) => {
    res.cookie("token", req.csrfToken());
    next();
});
app.use(express.static(path.join(__dirname, "..", "client", "public")));

//Routes
app.use(register);
app.use(login);
app.use(logout);
app.use(reset);
app.use(user);

app.get("/user/id.json", (req, res) => {
    res.json({ id: req.session.user });
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "..", "client", "index.html")));

if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Running Server @ ${chalk.blue(`http://localhost:${PORT}`)}`));
}
