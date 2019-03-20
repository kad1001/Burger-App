//    * Express
const express = require('express');
//    * `burger.js`
const burger = require('../models/burger');

// 4. Create the `router` for the app, and export the `router` at the end of your file.
const router = express.Router();


// Create the routes and associated logic
router.get('/', function (req, res) {

    burger.selectAll(function (data) {

        // get the data from the burgers table
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

//   adds a burger to the burgers table
router.post('/burgers', function (req, res) {
    burger.insertOne([ //updating the actual mysql component
        'burger_name'
    ], [ // the name of the burger is the name in the body
        req.body.burger_name
    ], function (data) {
        // refreshes page
        res.redirect('/');
    });
});
router.post('/burgers', function (req, res) {
    burger.insertOne([ //updating the actual mysql component
        'ketchup'
    ], [ // the name of the burger is the name in the body
        req.body.ketchup
    ], function (data) {
        // refreshes page
        res.redirect('/');
    });
});


//   when user clicks on a burger to eat it...
router.put('/burgers/:id', function (req, res) {
    let condition = 'id = ' + req.params.id;
    let ketchup = 'ketchup = ' + req.params.ketchup;
    console.log(req.params);


    burger.updateOne({
        devoured: 1,
        ketchup
    }, condition, function (data) {
        res.redirect('/');
    });
});


// Export routes for server.js to use.
module.exports = router;