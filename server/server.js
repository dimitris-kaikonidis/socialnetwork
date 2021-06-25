const chalk = require("chalk");
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const sessionSecret = require("./secrets.json").SESSION_SECRET;
const express = require("express");
const socketIO = require("socket.io");

const { addMessage, getMessagesFirst, getFriends } = require("./db/index");

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
const { get } = require("./routers/register");

const app = express();
const server = require("http").createServer(app);
const io = socketIO(server);
const cookieSessionMiddleWare = cookieSession({ secret: sessionSecret, maxAge: 1000 * 60 * 60 * 24 * 30 });

//Middlewares
app.use(compression());
app.use(cookieSessionMiddleWare);
io.use((socket, next) => cookieSessionMiddleWare(socket.request, socket.request.res, next));
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

io.on("connection", async (socket) => {

    if (!socket.request.session.user) {
        return socket.disconnect(true);
    }

    const { id } = socket.request.session.user;

    const users = {};
    for (let [id, socket] of io.of("/").sockets) {
        users[socket.handshake.auth.user_Id] = id;
    }

    const usersOnline = Object.keys(users);

    io.emit("usersOnline", usersOnline);



    socket.on("disconnect", () => {

        io.emit("usersOnline", usersOnline.filter(user => user != id));
    });

    // console.log(id);
    // const response = await getFriends(id);
    // const friendsId = response.rows.map(friend => friend.user_id);
    // console.log(friendsId);
    // friendsId.forEach(friendId => {
    // if (friendId in users) console.log('wtf');
    //socket.to(users[friendId]).emit("userOnline", id);
    //});

    socket.on("openChat", async (targetUserId) => {
        const response = await getMessagesFirst(id, targetUserId);
        socket.emit("openChat", response.rows);
    });

    socket.on("chatMessage", async ({ msg, targetUserId }) => {
        const response = await addMessage(id, targetUserId, msg);
        socket.emit("chatMessage", response.rows[0]);
        socket.to(users[targetUserId]).emit("chatMessage", response.rows[0]);
    });

});

if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => console.log(`Running Server @ ${chalk.blue(`http://localhost:${PORT}`)}`));
}
