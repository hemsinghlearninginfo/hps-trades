require('rootpath')();
require('dotenv').config({path: 'process.env'});
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

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

    // api routes for Email
    app.use("/email", require('./emails/email.controller'));

    // api routes for User
    app.use('/users', require('./users/users.controller'));

    // global error handler
    app.use(errorHandler);

    // start server
    const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
    const server = app.listen(port, function () {
        console.log('Server listening on port ' + port);
    });
}