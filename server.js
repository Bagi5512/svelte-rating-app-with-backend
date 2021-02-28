/*  REST-Testserver
    Source: https://web-forward.de/2020/06/tutorial-dive-into-vue-node-rest/
    Thanks to Prof. Dr. Marius Hofmeister
*/

const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const path = require('path');
const port = 5000;
const filename = __dirname + "/profs.json";

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

function log(req, res, next) {
    console.log(req.method + " Request at" + req.url);
    next();
}
app.use(log);


//Endpoints
app.get("/profs", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(data);
    });
});

app.get("/profs/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        const dataAsObject = JSON.parse(data)[req.params.id];
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(JSON.stringify(dataAsObject));
    });
});

app.put("/profs/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        dataAsObject[req.params.id].name = req.body.name;
        dataAsObject[req.params.id].rating = req.body.rating;
        fs.writeFile(filename, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});

app.delete("/profs/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        dataAsObject.splice(req.params.id, 1);
        for(let i = 0; i < dataAsObject.length; i++){
            dataAsObject[i].id = i;
        }

        fs.writeFile(filename, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});

app.post("/profs", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        dataAsObject.push({
            id: dataAsObject.length,
            name: req.body.name,
            rating: req.body.rating,
        });
        fs.writeFile(filename, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!!`));
