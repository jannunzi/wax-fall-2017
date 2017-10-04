module.exports = function (application) {
    var mongojs = require('mongojs');
    var q = require('q');
    var db = mongojs(application.databaseName);

    return {
        create: create,
        findAll: findAll,
        findById: findById
    };

    function create(collectionName, data) {
        var deferred = q.defer();
        db[collectionName].insert(data, function (err, response) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function findById(collectionName, _id) {
        var deferred = q.defer();
        db[collectionName].findOne({"_id": mongojs.ObjectId(_id)}, function (err, response) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function findAll(collectionName) {
        var deferred = q.defer();
        db[collectionName].find(function (err, response) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }
};