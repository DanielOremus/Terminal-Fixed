const db = require("../config/database.js");

module.exports.getUnits = (result) => {
  db.query("SELECT * FROM unit", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

module.exports.getUnitById = (id, result) => {
  db.query("SELECT * FROM unit WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      console.log(results[0]);
      result(null, results[0]);
    }
  });
};

module.exports.addUnit = (data, result) => {
  db.query("INSERT INTO unit SET?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

module.exports.updateUnit = (data, id, result) => {
  db.query(
    "UPDATE unit SET number = ?, status = ?, name = ?, rank = ?, department = ? WHERE id = ?",
    [data.number, data.status, data.name, data.rank, data.department, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

module.exports.deleteUnit = (id, result) => {
  db.query("DELETE FROM unit WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
