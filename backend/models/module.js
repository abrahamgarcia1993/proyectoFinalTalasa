// models/Module.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Course = require('./Course'); 

const Module = sequelize.define('Module', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Relación con el modelo de Course
Module.belongsTo(Course);
Course.hasMany(Module);

module.exports = Module;
