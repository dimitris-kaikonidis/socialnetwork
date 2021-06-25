const chalk = require("chalk");
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const sessionSecret = require("./secrets.json").SESSION_SECRET;
const express = require("express");
const socketIO = require("socket.io");

//Routers
const register = require("./routers/register");
const login = require("./routers/login");
const logout = require("./routers/logout");
const reset = require("./routers/reset");
const profile = require("./routers/profile");
const bio = require("./routers/bio");
const users = require("./routers/users");
const posts = require("./routers/posts");
const friends = require("./routers/friends");

const app = express();
const server = require("http").createServer(app);
const io = socketIO(server);

io.on("connection", () => {
    console.log(`socket is connected`);
});

//Middlewares
app.use(compression());
app.use(cookieSession({ secret: sessionSecret, maxAge: 1000 * 60 * 60 * 24 * 30 }));
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
app.use(profile);
app.use(bio);
app.use(users);
app.use(posts);
app.use(friends);

app.get("/api/start", (req, res) => res.json({ id: req.session.user }));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "..", "client", "index.html")));

if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => console.log(`Running Server @ ${chalk.blue(`http://localhost:${PORT}`)}`));
}
