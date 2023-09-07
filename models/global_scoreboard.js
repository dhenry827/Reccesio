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
    score_game_1: DataTypes.INTEGER,
    score_game_2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'global_scoreboard',
  });
  return global_scoreboard;
};