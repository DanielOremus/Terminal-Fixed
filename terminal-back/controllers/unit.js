const unitsModel = require("../models/unitModel");

module.exports.showUnits = (req, res) => {
  unitsModel.getUnits((err, results) => {
    if (err) {
      res.send(err);
    } else res.json(results);
  });
};

module.exports.showUnitById = (req, res) => {
  let id = req.params.id;
  unitsModel.getUnitById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//create new product
module.exports.createUnit = (req, res) => {
  const data = req.body;
  unitsModel.addUnit(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Update Product
module.exports.setUnit = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  unitsModel.updateUnit(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Delete Product
module.exports.removeUnit = (req, res) => {
  const id = req.params.id;
  unitsModel.deleteUnit(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
