const {MongoClient, ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Property} = require('./property');

module.exports = {Property, ObjectID};
