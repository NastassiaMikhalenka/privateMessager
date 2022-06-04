const redisClient = require("../redis");

module.exports.authorizeUser = (socket, next) => {
    if (!socket.request.session || !socket.request.session.user) {
        console.log("Bad req!");
        next(new Error("Nor authorized"));
    } else {
        socket.user = {...socket.request.session.user};
        redisClient.hset(`userid:${socket.user.username}`,
            "userid", socket.user.userid)
        next();
    }
};
