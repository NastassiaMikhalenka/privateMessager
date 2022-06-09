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
    socket.join(socket.user.userid);
    await redisClient.hset(
        `userid: ${socket.user.username}`,
        "userid",
        socket.user.userid,
        "connected",
        true
    );
    console.log("USERID: ", socket.user.userid);
    console.log("USERNAME: ", socket.user.username);

    //get friends, emit to all friends that we are offline now

    const friendsList = await redisClient.lrange(
        `friends: ${socket.user.username}`,
        0,
        -1);
    // console.log(friendsList);
    const parsedFriendsList = await parseFriendsList(friendsList)
    const friendRooms = parsedFriendsList.map(friend => friend.userid)

    if (friendRooms.length > 0)
        socket.to(friendRooms).emit("connected", true, socket.user.username)

    // console.log(`${socket.user.username} friends: `, parsedFriendsList)
    socket.emit("friends", parsedFriendsList)

    const msgQuery = await redisClient.lrange(`chat:${socket.user.userid}`, 0, -1);

    // to.from.content
    const messages = msgQuery.map(msgStr => {
        const parsedStr = msgStr.split(".");
        return {
            to: parsedStr[0],
            from: parsedStr[1],
            content: parsedStr[2]
        }
    });
    if (messages && messages.length > 0) {
        socket.emit("messages", messages);
    }

};


module.exports.addFriend = async (socket, friendName, cb) => {
    console.log(`friendName: ${friendName}`);

    if (friendName === socket.user.username) {
        cb({done: false, errorMsg: "Can't add self"});
        console.log("can't add self");
        return;
    }
    const friend = await redisClient.hgetall(
        `userid: ${friendName}`
    );

    const currentFriendsList = await redisClient.lrange(
        `friends: ${socket.user.username}`, 0, -1
    );
    if (!friend.userid) {
        cb({done: false, errorMsg: "User doesn't exist!"});
        return;
    }
    if (currentFriendsList && currentFriendsList.indexOf(`${friendName}.${friend.userid}`) !== -1) {
        cb({done: false, errorMsg: "Friend already added!"});
        return;
    }

    await redisClient.lpush(`friends: ${socket.user.username}`, [
        friendName, friend.userid
    ].join("."));

    const newFriend = {
        username: friendName,
        userid: friend.userid,
        connected: friend.connected
    }

    cb({done: true, newFriend});

    console.log(friend);
    // cb({done: true, errorMsg: "not valid name!"});
}


module.exports.onDisconnect = async (socket) => {
    await redisClient.hset(
        `userid:${socket.user.username}`,
        "connected",
        false
    );
    //get friends, emit to all friends that we are offline now
    const friendsList = await redisClient.lrange(`friends: ${socket.user.username}`, 0, -1)
    const friendRooms = await parseFriendsList(friendsList)
        .then(friends => friends.map(friend => friend.userid)
        );
    socket.to(friendRooms).emit("connected", false, socket.user.username)
}

const parseFriendsList = async (friendsList) => {
    const newFriendsList = [];

    for (let friend of friendsList) {
        const parsedFriend = friend.split(".")
        const friendConnected = await redisClient.hget(`userid:${parsedFriend[0]}`, "connected")

        newFriendsList.push({
            username: parsedFriend[0],
            userid: parsedFriend[1],
            connected: friendConnected
        })
    }
    return newFriendsList;
}


// dm
// const
module.exports.dm = async (socket, message) => {
    message.from = socket.user.userid
    //to.from.content
    const messageString = [message.to, message.from, message.content].join(".");

    await redisClient.lpush(`chat:${message.to}`, messageString);
    await redisClient.lpush(`chat:${message.from}`, messageString);


    socket.to(message.to).emit("dm", message);

}

// module.exports = dm;