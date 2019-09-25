const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const app = express();
const dbConfig = require('./config/secret');
app.use(express.json({
    limit: '50mb'
})); //Return our information in json format
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(cookieParser()); //save a cookie tooken for testing
// app.use(logger('dev')); //development

mongoose.Promise = global.Promise;
mongoose.connect(
    dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        if (err) return console.log(err)
    });

const auth = require('./routes/authRoutes');
app.use('/api/yacapp', auth); // Every url that we have will have this

app.listen(3000, () => {
    console.log('Running on port 3000');
});