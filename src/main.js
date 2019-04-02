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

app.get('/onload', (request, response) => {
    let usersData = [];
    var sql = "SELECT tbUsers.Id AS userId, tbUsers.login, tbUsers.password, tbUsersData.Id AS userDataId, tbUsersData.FirstName, tbUsersData.LastName, tbUsersData.AGE FROM db_Users.tbUsersData JOIN db_Users.tbUsers ON db_Users.tbUsersData.userID = db_Users.tbUsers.Id";
    config.query(sql, function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
            usersData.push(result[i]);
        }
        response.send(JSON.stringify(usersData));
});

});
app.post('/createElement',jsonParser, function(request, response){
    if(!request.body) return response.sendStatus(400);
    const user = request.body;
    console.log(user);
    var sql = "SELECT login, email FROM db_Users.tbUsers";
    config.query(sql, function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            if (user.login === result[i].login) {
                response.send(`Login already exist`);
                return;
            }
            if (user.email === result[i].email) {
                response.send(`Email already exist`);
                return;
            }
        }
    });
    var sql = `INSERT INTO db_Users.tbUsers (login, password) VALUES ("${user.login}", "${user.password}")`;
    config.query(sql, function (err, result) {
        if (err) throw err;
    });
    let lastInsertId;
    var sql = `SELECT LAST_INSERT_ID()`;
    config.query(sql, function (err, result) {
        lastInsertId = result[0]['LAST_INSERT_ID()'];
        console.log(lastInsertId);
        if (err) throw err;
        var sql = `INSERT INTO db_Users.tbUsersData (FirstName, LastName, AGE, userID) VALUES ("${user.firstName}", "${user.lastName}", "${user.age}", "${lastInsertId}")`;
        config.query(sql, function (err, result) {
            if (err) throw err;
        });
    });
});
app.post('/update', jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    const user = request.body;
    console.log("UPDATE");
    console.log(user);
    var sql = "SELECT login, email FROM db_Users.tbUsers";
    config.query(sql, function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            if (user.login === result[i].login) {
                response.send(`Login already exist`);
                return;
            }
        }
    });
    var sql = "SELECT tbUsers.Id AS userId, tbUsers.login, tbUsers.password, tbUsersData.Id AS userDataId, tbUsersData.FirstName, tbUsersData.LastName, tbUsersData.AGE FROM db_Users.tbUsersData JOIN db_Users.tbUsers ON db_Users.tbUsersData.userID = db_Users.tbUsers.Id";
    config.query(sql, function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
            if(result[i].userId === +user.id){

                if(user.login === ''){
                    console.log(result[i].login);
                    user.login = result[i].login;
                }
                if(user.password === ''){
                    user.password = result[i].password;
                }
                if(user.firstName === ''){
                    user.firstName = result[i].FirstName;
                }
                if(user.lastName === ''){
                    user.lastName = result[i].LastName;
                }
                if(user.age === ''){
                    user.age = result[i].AGE;
                }

            }
        }
        var sql = `UPDATE db_Users.tbUsers SET login = "${user.login}", password = "${user.password}" WHERE id = "${+user.id}"`;
        config.query(sql, function (err, result) {
            if (err) throw err;
            //response.send("noMatches");
        });
        var sql = `UPDATE db_Users.tbUsersData SET FirstName = "${user.firstName}", LastName = "${user.lastName}", age = "${+user.age}"  WHERE userID = "${+user.id}"`;
        config.query(sql, function (err, result) {
            if (err) throw err;
            //response.send("Update completed");
        });
        //response.send(JSON.stringify(usersData));
    });

});
app.post('/delete', jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    const user = request.body;
    var sql = "SELECT id FROM db_Users.tbUsersData";
    config.query(sql, function (err, result) {
        if (err) throw err;
        var sql = `DELETE FROM db_users.tbUsersData where userID = ${user.id}`;
        config.query(sql, function (err, result) {
            if (err) throw err;
        });
        var sql = `DELETE FROM db_users.tbUsers where id = ${user.id}`;
        config.query(sql, function (err, result) {
            if (err) throw err;
        });
    });
});




app.post("/registr", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    const user = request.body;
    var sql = "SELECT login, email FROM db_Users.tbUsers";
    config.query(sql, function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
            if (user.login === result[i].login){
                response.send(`login exist`);
                return;
            }
            if (user.email === result[i].email){
                response.send(`email exist`);
                return;
            }
        }

        var sql = `INSERT INTO db_Users.tbUsers (login, password, email) VALUES ("${user.login}", "${user.password}", "${user.email}")`;
        config.query(sql, function (err, result) {
            if (err) throw err;
            console.log("user inserted to database");
        });
        var sql = "SELECT id, login FROM db_Users.tbUsers";
        config.query(sql, function (err, result) {
            if (err) throw err;
            for (let i = 0; i < result.length; i++){
                console.log(result)
                if (result[i].login === user.login) {
                    console.log(result[i].id);
                    var sql = `INSERT INTO db_Users.tbUsersData (userID) VALUES ("${result[i].id}")`;
                    config.query(sql, function (err, result) {
                        if (err) throw err;
                        response.send(`insertSuccess`);
                        console.log("user inserted to database");
                    });
                }
            }
        });
    });
});

app.post("/login", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    const user = request.body;
    var sql = "SELECT email, password FROM db_Users.tbUsers";
    config.query(sql, function (err, result) {
        if (err) throw err;
        console.log("got email, password from client");
        for (let i = 0; i < result.length; i++){
            const dataFromDb = JSON.stringify({email:result[i].email, password:result[i].password});
            const innerData = JSON.stringify({email:user.email, password:user.password});
            if (dataFromDb === innerData) {
                response.send("isMatch");
                return;
            }
        }
        response.send("noMatches");
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
        console.log("Database db_Users created or exist");
    });
    config.query("USE db_Users", function (err, result) {
        if (err) throw err;
        console.log("to use db_Users");
    });
    var sql = "CREATE TABLE IF NOT EXISTS tbUsers (id Int NOT NULL AUTO_INCREMENT, login CHAR(30), password CHAR(30), email VARCHAR(255), PRIMARY KEY (id))";
    config.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table tbUsers created or exist");
    });
    var sql = "CREATE TABLE IF NOT EXISTS tbUsersData (Id Int NOT NULL AUTO_INCREMENT, FirstName CHAR(30), LastName CHAR(30), age int, userID int, PRIMARY KEY (Id), FOREIGN KEY (userID) REFERENCES tbUsers(id))";
    config.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table tbUsersData created or exist");
    });
});



