const express = require("express");
const {Server} = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouters");
const {sessionMiddleware, wrap, corsConfig} = require("./controllers/serverController");
const server = require("http").createServer(app)

require("dotenv").config();

// const io = new Server(server, {
//     cors: corsConfig, // не работает
// });

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: "true",
    },
});


app.use(helmet());

app.use(cors(corsConfig)); // не работает
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());

//server controller
app.use(sessionMiddleware);

app.use("/auth", authRouter);

app.get('/', (req, res) => {
    res.json('hi');
});
io.use(wrap(sessionMiddleware));

io.on("connect", socket => {
    // console.log(socket.request.session.user.username);
});

server.listen(4000, () => {
    console.log("Server listening on port 4000");
});