'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User,{
        foreignKey: "UserId",
        targetKey:"id"
      })
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
     type: DataTypes.DATE,
    //  validate: {
    //    isAfter: {
    //      args: new Date(),
    //      msg: "Select a date more than today"
    //    }
    //  }
    },
    UserId: DataTypes.INTEGER
    }, 
  {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};