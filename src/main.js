const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.options('*', cors());
const mysql = require('mysql');
const jsonParser = express.json();

const config = mysql.createConnection({
    host: "localhost",
    user: "Kot",
    password: "11110000Kot",
});

app.post("/registr", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    const user = request.body;
    var sql = "SELECT login FROM db_Users.tbUsers";
    config.query(sql, function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
            if (user.login === result[i].login){
                response.send("asdfasdf");
               return;
            }
            console.log(user.login);
        }
        var sql = `INSERT INTO db_Users.tbUsers (login, password, email) VALUES ("${user.login}", "${user.password}", "${user.email}")`;
        config.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
});

app.post("/login", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    //console.log(request.body);
    const user = request.body;
    var sql = "SELECT email, password FROM db_Users.tbUsers";
    config.query(sql, function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
            const dataFromDb = JSON.stringify({email:result[i].email, password:result[i].password});
            const innerData = JSON.stringify({email:user.email, password:user.password});
            if (dataFromDb === innerData) {
                console.log("adfgsdfg");
                //response.json('{NOTError:23}');
                response.end("success");
                return;
            }

        }
        response.send("no success123");
    });
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('listening port...');
});

console.log("Connected!");
config.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    config.on('error', function(err) {
        console.log("[mysql error]",err);
    });
    config.query("CREATE DATABASE IF NOT EXISTS db_Users", function (err, result) {
        if (err) throw err;
        console.log("Database db_Users created");
    });
    config.query("USE db_Users", function (err, result) {
        if (err) throw err;
        console.log("to use db_Users");
    });
    var sql = "CREATE TABLE IF NOT EXISTS tbUsers (id Int NOT NULL AUTO_INCREMENT, login CHAR(30), password CHAR(30), email VARCHAR(255), PRIMARY KEY (id))";
    config.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table tbUsers created");
    });
    var sql = "CREATE TABLE IF NOT EXISTS tbUsersData (userDataId Int NOT NULL AUTO_INCREMENT, FirstName CHAR(30), LastName CHAR(30), age int, userID int, PRIMARY KEY (userDataId), FOREIGN KEY (userID) REFERENCES tbUsers(id))";
    config.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table tbUsersData created");
    });
});



