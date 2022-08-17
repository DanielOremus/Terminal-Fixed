const db = require("../config/database.js");

module.exports.getCalls = (result) => {
  db.query("SELECT * FROM calls", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

module.exports.getCallById = (id, result) => {
  db.query("SELECT * FROM calls WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

module.exports.addCall = (data, result) => {
  db.query("INSERT INTO calls SET?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

module.exports.updateCall = (data, id, result) => {
  db.query(
    "UPDATE calls SET title = ?, status = ?, location = ?, respondingUnits = ?, priority = ?, details = ?, code = ?, notes = ? WHERE id = ?",
    [
      data.title,
      data.status,
      data.location,
      data.respondingUnits.toString(),
      data.priority,
      data.details,
      data.code,
      data.notes,
      id,
    ],
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

module.exports.deleteCall = (id, result) => {
  db.query("DELETE FROM calls WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
