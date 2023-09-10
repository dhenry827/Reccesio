'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class global_scoreboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  global_scoreboard.init({
    rps_scores: DataTypes.INTEGER,
    tic_tac_toe_scores: DataTypes.INTEGER,
    hangman_scores: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'global_scoreboard',
  });
  return global_scoreboard;
};