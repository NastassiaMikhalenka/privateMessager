const redisClient = require("../redis");

module.exports.authorizeUser = (socket, next) => {
    if (!socket.request.session || !socket.request.session.user) {
        console.log("Bad req!");
        next(new Error("Nor authorized"));
    } else {
        next();
    }
};

module.exports.initializeUser = async socket => {
    socket.user = {...socket.request.session.user};
    await redisClient.hset(
        `userid: ${socket.user.username}`,
        "userid",
        socket.user.userid,
    );
    const friendsList = await redisClient.lrange(`friends: ${socket.user.username}`, 0, -1)
    console.log(friendsList);

    socket.emit("friends", friendsList)

    console.log("USERID: ", socket.user.userid);
    console.log("USERNAME: ", socket.user.username);
};


module.exports.addFriend = async (socket, friendName, cb) => {
    console.log(`friendName: ${friendName}`);

    if (friendName === socket.user.username) {
        cb({done: false, errorMsg: "Can't add self"});
        console.log("can't add self");
        return;
    }
    const friendUserId = await redisClient.hget(
        `userid: ${friendName}`, "userid"
    );

    const currentFriendsList = await redisClient.lrange(
        `friends: ${socket.user.username}`, 0, -1
    );
    if (!friendUserId) {
        cb({done: false, errorMsg: "User doesn't exist!"});
        return;
    }
    if (currentFriendsList && currentFriendsList.indexOf(friendName) !== -1) {
        cb({done: false, errorMsg: "Friend already added!"});
        return;
    }

    await redisClient.lpush(`friends: ${socket.user.username}`, friendName);
    cb({done: true});

    console.log(friendUserId);
    // cb({done: true, errorMsg: "not valid name!"});
}
