const Sequelize = require("sequelize");

module.exports = class Favorite extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Favorite",
        tableName: "favorites",
      }
    );
  }
  static associate(db) {}
};
