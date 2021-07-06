var config = require('./config'); //Configfile

//NPM Modules
const bodyParser = require('body-parser'); //For easy body parsing and generating
const cors = require('cors'); //To enable CORS
const express = require('express'); //For API

const app = express();

var corsOptions = {
    origin: 'http://192.167.1.57:3001'
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

app.listen(config.web.port, () => {
    console.log('Webserver live. Listening to http://192.168.1.57:' + config.web.port);
});


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