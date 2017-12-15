var app = require('./express');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/hello', function (req, res) {
    res.send('Hello');
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wax_ide', { useMongoClient: true });
mongoose.Promise = global.Promise;

// var application = require('./speakApp.json');
var wax = require("./wax");
wax(app);

app.listen(3000);