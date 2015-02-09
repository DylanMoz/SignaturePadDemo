/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /signature              ->  create
 * GET     /signature/:id          ->  show
 * PUT     /signature/:id          ->  update
 * DELETE  /signature/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Signature = require('./signature.model');

// Get a single signature
exports.show = function(req, res) {
  Signature.findById(req.params.id, function (err, signature) {
    if(err) { return handleError(res, err); }
    if(!signature) { return res.send(404); }
    signature.signature = JSON.parse(signature.signature)
    return res.json(signature);
  });
};

// Creates a new signature in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  var newSig = {
    user: req.body.name,
    date: new Date(),
    signature: req.body.output
  };
  Signature.create(newSig, function(err, signature) {
    if(err) { return handleError(res, err); }
    return res.json(201, signature);
  });
};

// Updates an existing signature in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Signature.findById(req.params.id, function (err, signature) {
    if (err) { return handleError(res, err); }
    if(!signature) { return res.send(404); }
    var updated = _.merge(signature, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, signature);
    });
  });
};

// Deletes a signature from the DB.
exports.destroy = function(req, res) {
  Signature.findById(req.params.id, function (err, signature) {
    if(err) { return handleError(res, err); }
    if(!signature) { return res.send(404); }
    signature.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
