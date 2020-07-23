const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const projectsRoutes = require('./api/routes/projects');

mongoose.connect(
    "mongodb+srv://" + process.env.MONGO_ATLAS_USERNAME + ":" +
    process.env.MONGO_ATLAS_PWD +
    "@cluster0-fb0ts.gcp.mongodb.net/dev1?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header(
        'Acces-Controll-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use('/v1/project', projectsRoutes)
app.use('/v1/user', userRoutes);


//Handles errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;