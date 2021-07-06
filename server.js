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

//In live we dont need to drop and reload the database
//db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
    console.log('Dropping and reloading database');
    initial();
});


app.get('/', (req, res) => {
    res.json({ message: 'Webserver is live. Welcome!' });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

/*app.listen(config.web.port, () => {
    console.log('Webserver live. Listening to http://172.29.192.30:' + config.web.port);
});*/

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(config.web.port);


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