var path = require('path');
var fs = require('fs');
var path = require('path');

var app = null;
var application = null;

module.exports = function (_app, _application) {

    var model;// = require("./model/model")(_application);
    application = _application;
    var applicationModel = require('./model/application.model.server');

    app = _app;
    app.set('view engine', 'ejs');

    app.set('views', path.join(__dirname, '/views'));

    app.get('/wax/test', test);
    app.get('/wax/:appname/index.html', index);
    app.get('/wax/vendor/*', vendor);
    app.get('/wax/app.js', appJs);
    app.get('/wax/config.js', configJs);

    app.get('/wax/entity/:entityName/controllers/:type/*', controllersJs);
    app.get('/wax/entity/:entityName/templates/:type/*', templatesJs);
    app.get('/wax/entity/:entityName/service/*', serviceJs);

    // api
    app.post('/wax/api/:entityName', create);
    app.get('/wax/api/:entityName', findAll);
    app.get('/wax/api/:entityName/:entityId', findById);

    app.get('/wax/page/:pageName/templates/*', pageHtml);
    app.get('/wax/page/:pageName/controllers/*', pageJs);
    app.get('/wax/page/:pageName/service/*', pageServiceJs);

    // TODO: merge these 4 into an entityHandler?

    app.get('/wax/:entityName/templates/list', entityListTemplate); // TODO: deprecate?

    app.get('/wax/static/*', staticFiles);
    
    function staticFiles(req, res) {
        res.sendFile(path.join(__dirname, '/static', req.params[0]));
    }

    function create(req, res) {
        var entityName = req.params.entityName;
        var data = req.body;
        model
            .create(entityName, data)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.send(err);
            });
    }

    function findById(req, res) {
        var entityName = req.params.entityName;
        var entityId = req.params.entityId;
        model
            .findById(entityName, entityId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.send(err);
            });
    }

    function findAll(req, res) {
        var entityName = req.params.entityName;
        model
            .findAll(entityName)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.send(err);
            });
    }

    function controllersJs(req, res) {
        var entityName = req.params.entityName;
        var type = req.params.type;
        var data = Object.assign({}, application, req.params);
        res.render("controllers/" + type, data);
    }

    function templatesJs(req, res) {
        var entityName = req.params.entityName;
        var type = req.params.type;
        var data = Object.assign({}, application, req.params);
        res.render("templates/" + type, data);
    }

    function pageHtml(req, res) {
        var data = Object.assign({}, application, req.params);
        data.page = application.pages[req.params.pageName];
        data.widgets = data.page.widgets;
        res.render("pages/templates/page", data);
    }

    function pageJs(req, res) {
        var data = Object.assign({}, application, req.params);
        data.page = application.pages[req.params.pageName];
        data.widgets = data.page.widgets;
        res.render("pages/controllers/page", data);
    }

    function pageServiceJs(req, res) {
        var data = Object.assign({}, application, req.params);
        data.page = application.pages[req.params.pageName];
        data.widgets = data.page.widgets;
        res.render("pages/services/service", data);
    }

    function serviceJs(req, res) {
        var entityName = req.params.entityName;
        var data = Object.assign({}, application, req.params);
        res.render("services/service", data);
    }

    function appJs(req, res) {
        var data = Object.assign({}, application, req.params);
        res.render('app', data);
    }

    function configJs(req, res) {
        var data = Object.assign({}, application, req.params);
        res.render('config', data);
    }

    function entityListTemplate(req, res) {
        var data = Object.assign({}, application, req.params);
        data.entity = application.entities[data.entityName];
        res.render('templates/list', data);
    }

    function entityListController(req, res) {
        var data = Object.assign({}, application, req.params);
        data.entity = application.entities[data.entityName];
        res.render('controllers/list', data);
    }

    function index(req, res) {
        var applicationName = req.params["appname"];
        applicationModel.findApplicationByName(applicationName)
            .then(function (theApp) {
                if(theApp) {
                    application = theApp.toObject();
                } else {
                    application = require('../applications/'+applicationName+'.json');
                }
                // model = require("./model/model")(application);
                var data = {};
                Object.assign(data, application, req.params);
                res.render('index', data);
            }, function(){
            });
    }

    function vendor(req, res) {
        res.send(req.params);
    }

    function test(req, res) {
        res.send('test');
    }
};
