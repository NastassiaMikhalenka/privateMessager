const express = require("express");
const {sessionMiddleware, wrap, corsConfig} = require("./controllers/serverController");
const {Server} = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouters");
const {authorizeUser, addFriend, initializeUser, onDisconnect, dm} = require("./controllers/socketController");
const server = require("http").createServer(app);

require("dotenv").config();

const io = new Server(server, {
    cors: corsConfig,
});

app.use(helmet());

app.use(cors(corsConfig));

app.use(express.json());

//server controller
app.use(sessionMiddleware);

app.use("/auth", authRouter);
app.set("trust proxy", 1);

app.get('/', (req, res) => {
    res.json('hi');
});
io.use(wrap(sessionMiddleware));
io.use(authorizeUser); // если ок, то пойдет дальше в connect

io.on("connect", socket => {
    initializeUser(socket);
    socket.on("add_friend", (friendName, cb) => {
        addFriend(socket, friendName, cb);
    });

    socket.on("dm", message => dm(socket, message));

    socket.on("disconnecting", () => onDisconnect(socket))
});

server.listen(4000, () => {
    console.log("Server listening on port 4000");
});