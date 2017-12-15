var mongoose = require('mongoose');
var applicationSchema = mongoose.Schema({
    applicationName: String,
    pages: Object
}, {collection: 'application'});
module.exports = applicationSchema;