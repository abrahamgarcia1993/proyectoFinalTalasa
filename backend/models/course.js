const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Payment = require('./Payment'); // Asegúrate de que Payment se define antes
const User = require('./User');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  temporalidad: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  OwnerUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

// Definir asociaciones
Course.hasMany(Payment, { foreignKey: 'courseId' });

module.exports = Course;
