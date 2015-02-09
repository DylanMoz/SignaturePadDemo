'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SignatureSchema = new Schema({
  user: String,
  date: Date,
  signature: Array
});

module.exports = mongoose.model('Signature', SignatureSchema);
