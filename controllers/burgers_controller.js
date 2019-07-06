// Pull in the Burger model
var db = require("../models");
module.exports = function(app) {
  // Retrieve the list of all burgers in the database
  app.get("/", function(req, res) {
    db.Burger.findAll({
      include: [ db.Customer ],
      order: "name ASC"
    })
    .then(function(data) {

      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render('index', hbsObject);
    })
    .catch(function(err) {
      res.json({status: "ERROR", message: err});
    });
  });

  // Create a new burger entry
  app.post("/burgers", function(req, res) {

    db.Burger.create(req.body)
    .then(function(burger) {
      res.redirect("/");
    })
    .catch(function(err) {
      res.json({status: "ERROR", message: err});
    });
  });

  // Update an existing burger entry
  app.put("/burgers/:id", function(req, res) {
    var burgerID = req.params.id;
    var customerName = req.body.customerName;

    db.Customer.findAll({
      where: {
        name: customerName
      }
    })
    .then(function(customer) {
      // Check if customer exists
      if (customer.length === 0) {
        // Create new customer
        db.Customer.create({
          name: customerName
        })
        .then(function(newCustomer) {
          // Add customer reference to burger
          db.Burger.update(
            {
              devoured: true,
              CustomerId: newCustomer.id
            },
            {
              where: {
                id: req.params.id
              }
            }
          ).then(function(burger) {
            res.redirect('/');
          })
          .catch(function (err) {
            res.json({status: "ERROR", message: err});
          });
        })
        .catch(function(error) {
          res.json({status: "ERROR", message: error});
        })
      } else { // customer exists

        // Add customer reference to burger
        db.Burger.update(
          {
            devoured: true,
            CustomerId: customer[0].id
          },
          {
            where: {
              id: req.params.id
            }
          }
        ).then(function(burger) {
          res.redirect('/');
        })
        .catch(function (err) {
          res.json({status: "ERROR", message: err});
        });
      } // end customer exists
    })
    .catch(function(error) {
      if(error) {
        res.json({status: "ERROR", message: error});
      }
    });
  });
};