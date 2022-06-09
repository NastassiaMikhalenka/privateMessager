const redisClient = require("../redis");


module.exports.rateLimiter = (secondsLimit, limitAmount) =>
    async (req, res, next) => {
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        // req.connection.remoteAddress.slice(0, 4);
        const [response] = await redisClient
            .multi()
            .incr(ip)
            .expire(ip, secondsLimit)
            .exec();
        // console.log(response[1]);
        if (response[1] > limitAmount) {
            res.json({loggedIn: false, status: "Slow down! Try again in minute."})
        } else next();
    };