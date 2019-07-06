// sequelize burger object model
module.exports = function (sequelize, DataTypes) {
    // define the model
    var Burger = sequelize.define("Burger", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      devoured: {
        // instead of tinyint(1)
        type: DataTypes.BOOLEAN,
        // instead of default 0
        defaultValue: false
      },
      // ===========
      // spice up ur burger w some extras
      // ============
      patty: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      ketchup: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      mushrooms: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      mystery: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      classMethods: {
        associate: function (models) {
          // Burger is associated with one customer
          Burger.belongsTo(models.Customer, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: true
              // name: 'CustomerName'
            }
          });
        }
      }
    });
    return Burger;
  };