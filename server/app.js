const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const projectsRoutes = require('./api/routes/projects');
const errorCodesRoutes = require('./api/routes/error_codes');
const errorCodeRoutes = require('./api/routes/error_code');
const authRoutes = require('./api/routes/auth');

const auth = require('./api/middleware/auth');

mongoose.connect(
    "mongodb+srv://" + process.env.MONGO_ATLAS_USERNAME + ":" +
    process.env.MONGO_ATLAS_PWD +
    "@cluster0.y7cv7.gcp.mongodb.net/eco?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
);

const corsOptions =  {
    origin: process.env.CORS_ORIGIN
};
app.use(cors(corsOptions));

app.use(morgan('short'));

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
app.use('/v1/project', auth, projectsRoutes);
app.use('/v1/error_codes', auth, errorCodesRoutes);
app.use('/v1/error_code', auth, errorCodeRoutes);
app.use('/v1/auth', authRoutes);


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