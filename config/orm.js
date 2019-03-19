// * Import (require) `connection.js` into `orm.js`
const connection = require('./connection');

function questionMark(num) {
	for (var i = 0; i < num; i++) {
        return "?";
}
}


function toSql(ob) {
	for (var key in ob) {
        return key + "=" + obj[key];
}
}

// ORM object to perform SQL queries
module.exports = {

	// Function that returns all table entries
	selectAll: function(tableInput, cb) {
		// Construct the query string that returns all rows from the target table
		let queryString = "SELECT * FROM " + tableInput + ";";

		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	},

	// Function that insert a single table entry
	insertOne: function(table, cols, vals, cb) {
		// Construct the query string that inserts a single row into the target table
		let queryString = "INSERT INTO " + table;
		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += questionMark(vals.length);
		queryString += ") ";

		// Perform the database query
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	},
	// Function that updates a single table entry
	updateOne: function(table, objColVals, condition, cb) {

		// Construct the query string that updates a single entry in the target table
		let queryString = "UPDATE " + table;
		queryString += " SET ";
		queryString += toSql(objColVals);
		queryString += " WHERE ";
        queryString += condition;
        
		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	}
};