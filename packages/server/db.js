const {Pool} = require("pg");

require("dotenv").config();

const devConfig = {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
}

// const pool = new Pool({
//     database: process.env.DATABASE_NAME,
//     host: process.env.DATABASE_HOST,
//     password: process.env.DATABASE_PASSWORD,
//     user: process.env.DATABASE_USER,
//     port: process.env.DATABASE_PORT,
// });

const proConfig = `postgres://quqgpcgjdpwkyn:6591cf3775ab3db7b765a9328bdd721c10d5b5593f49391e260b25cebdbe9e5c@ec2-52-73-184-24.compute-1.amazonaws.com:5432/dcoriovsec3cmb`

const pool = new Pool(devConfig);

module.exports = pool;