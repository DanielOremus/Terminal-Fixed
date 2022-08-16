const callModel = require("../models/callModel");

module.exports.showCalls = (req, res) => {
  callModel.getCalls((err, results) => {
    if (err) {
      res.send(err);
    } else res.json(results);
  });
};

module.exports.showCallById = (req, res) => {
  let id = req.params.id;
  callModel.getCallById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//create new product
module.exports.createCall = (req, res) => {
  const data = req.body;
  callModel.addCall(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Update Product
module.exports.setCall = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  callModel.updateCall(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Delete Product
module.exports.removeCall = (req, res) => {
  const id = req.params.id;
  callModel.deleteCall(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
