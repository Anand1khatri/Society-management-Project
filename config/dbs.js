var mysql = require("mysql");
var express = require("express");
var router = express.Router();

// Create a connection to the database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "society_management",
  // port: 3307
});

// Connect to MySQL and run a test query
con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connected to MySQL database");
  }
});


module.exports.addSociety = function (society_id, society_name, society_description,  president, callback) {
    var query = `INSERT INTO society (society_id, society_name, society_description, president) VALUES (?, ?, ?, ?)`;
    con.query(query, [society_id, society_name, society_description,  president], function (err, results) {
      if (err) {
        console.error("Error during database insertion:", err);
        return callback(err);
      }
      callback(null, results);
    });
  };
  

  module.exports.getAllSocieties = function (callback) {
    var query = `SELECT * FROM society`;
    con.query(query, function (err, res) {
      if (err) {
        return callback(err);
      }
      callback(null, res);
    });
  };
  

  module.exports.addCompetition = function (competition_id, society_id, name, date, location, callback) {
    var query = `INSERT INTO competition (competition_id, society_id, name, date, location) VALUES (?, ?, ?, ?, ?)`;
    con.query(query, [competition_id, society_id, name, date, location], function (err, results) {
      if (err) {
        console.error("Error during database insertion:", err);
        return callback(err);
      }
      callback(null, results);
    });
  };
  

  module.exports.getAllCompetitions = function (callback) {
    var query = `SELECT * FROM competition`;
    con.query(query, function (err, res) {
      if (err) {
        return callback(err);
      }
      callback(null, res);
    });
  };
  