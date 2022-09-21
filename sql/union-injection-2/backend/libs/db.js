const mysql = require('mysql')
const config = require('../config')

const conn = mysql.createConnection({
    host: config.mysql_host,
    port: config.mysql_port,
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database,
})

conn.connect((err) => {
    if (err) {
        console.error("failed to connect to database, error: ", err);
        process.exit(1);
    }
    console.log("db connected successfully");
});

function register(username, password) {
    const params = [username, password];
    const sql = "insert into users (username, password) values (?,?)";
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve({ uid: result.insertID });
        });
    });
}

function getUserInfo(userid) {
    const params = [];
    const sql = "select userid, username from users where userid="+userid;
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            if (err) {
                console.log(err)
                return reject(err);
            }
            if (result.length === 0) {
                return resolve({});
            }
            console.log(result)
            return resolve(result);
        });
    });
}

module.exports = {
    register,
    getUserInfo
}