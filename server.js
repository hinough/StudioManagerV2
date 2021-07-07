var config = require('./config'); //Configfile

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};


//NPM Modules
const bodyParser = require('body-parser'); //For easy body parsing and generating
const cors = require('cors'); //To enable CORS
const express = require('express'); //For API

const app = express();

var corsOptions = {
    origin: 'http://172.29.192.30:3001'
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); //Request a body with content-type json
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');
const Role = db.role;

//If CLI argument "FIRSTINSTALL" is given, DB is dropped and refreshed
if(process.argv[2] === "CLEAN") {
    db.sequelize.sync({ force: true }).then(() => {
        console.log('Database dropped and cleanly installed');
        initial();
    });
}//Else its just started as is with data
else {
    db.sequelize.sync();
}

app.get('/', (req, res) => {
    res.status(200).send("<img src=https://media1.tenor.com/images/429441c6065986233600cecf6fa3a6f3/tenor.gif?itemid=17646607></img>");
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(config.web.port);
console.log("Server live and listening to port " + config.web.port);

function initial() {
    Role.create({
        id: 1,
        name: 'User'
    });

    Role.create({
        id: 2,
        name: 'Administrator'
    });
}