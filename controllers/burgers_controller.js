
//    * Express
const express = require('express');
//    * `burger.js`
const burger = require('../models/burger');

// 4. Create the `router` for the app, and export the `router` at the end of your file.
const router = express.Router();


// Create the routes and associated logic
router.get('/', function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      // console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });
  
  router.post('/burgers', function(req, res) {
    burger.insertOne([
      'burger_name'
    ], [
      req.body.burger_name
    ], function(data) {
      res.redirect('/');
    });
  });
  
  router.put('/burgers/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;
  
    burger.updateOne({
      devoured: true
    }, condition, function(data) {
      res.redirect('/');
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;
