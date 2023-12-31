'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rps_high_score: DataTypes.INTEGER,
    tic_tac_toe_high_score: DataTypes.INTEGER,
    hangman_high_score: DataTypes.INTEGER,
    resetToken: DataTypes.INTEGER,
    resetTokenExpires: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};