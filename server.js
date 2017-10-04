var app = require('./express');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/hello', function (req, res) {
    res.send('Hello');
});

var application = require('./speakApp.json');
var wax = require("./wax");
wax(app, application);

app.listen(3000);