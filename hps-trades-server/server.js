require('rootpath')();
require('dotenv').config({ path: 'process.env' });

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const jwt = require('_helpers/jwt');
const config = require('config.json');
const errorHandler = require('_helpers/error-handler');
const pushMethods = require('./socket/pushMethods');



// Seedind DB
const seed = require('./seed');
seed.seedDB();

// const cluster = require("cluster");
// const numCPUs = require("os").cpus().length;

// // Multi-process to utilize all CPU cores.
// if (cluster.isMaster) {
//     console.error(`Node cluster master ${process.pid} is running`);

//     // Fork workers.
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on("exit", (worker, code, signal) => {
//         console.error(
//             `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
//         );
//     });
// }
// else 
{

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    // use JWT auth to secure the api
    app.use(jwt());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "*");
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        next();
    });

    routes();

    ioConnection();

    // start server
    const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
    server.listen(port, function () {
        console.log('Server listening on port ' + port);
    });
}

function routes() {
    // api routes for Master Data
    app.use("/eventtype", require('./masters/eventTypes/eventTypes.controller'));
    app.use("/emailtype", require('./masters/emailTypes/emailTypes.controller'));
    app.use("/userrole", require('./masters/userRoles/userRoles.controller'));

    app.use("/mdata", require('./masters/master.controller'));

    // api routes for event
    app.use("/event", require('./event/events.controller'));

    // api routes for Email
    app.use("/email", require('./emails/email.controller'));

    // api routes for User
    app.use('/users', require('./users/users.controller'));

    // global error handler
    app.use(errorHandler);
}

function ioConnection() {

    const test = async socket => {
        try {
            const res = 'time comming from server : ' + (new Date());
            socket.emit(config.SocketEventFromAPI, (res));
        } catch (error) {
            console.error(`Error: ${error.code}`);
        }
    };

    io.on("connection", socket => {
        console.log("New Socket IO Client Connected"),
            setInterval(
                () => {
                    test(socket)
                },
                1000
            );
        socket.on("disconnect", () => console.log("Socket IO Client disconnected"));
    });

    io.origins((origin, callback) => {
        if (origin !== process.env.HPS_TRADES_MAIN_APP_URL) {
            return callback('Frontend origin not allowed.', false);
        }
        callback(null, true);
    });
    
}