var mongoose = require('mongoose');
var applicationSchema = require('./application.schema.server');
var applicationModel = mongoose.model('ApplicationModel', applicationSchema);
applicationModel.findApplicationByName = findApplicationByName

module.exports = applicationModel;

function findApplicationByName(applicationName) {
    return applicationModel.findOne({applicationName: applicationName});
}
