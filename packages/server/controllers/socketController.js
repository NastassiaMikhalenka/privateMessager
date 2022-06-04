module.exports.authorizeUser = (socket, next) => {
    if (!socket.request.session || !socket.request.session.user) {
        console.log("Bad req!");
        next(new Error("Nor authorized"));
    } else {
        next();
    }
};