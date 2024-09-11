const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const User = require('./User');
const Course = require('./Course');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  courseId: {
    type: DataTypes.INTEGER,
    
  },
  purchaseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  paymentIntentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Definir asociaciones
// Payment.belongsTo(User, { foreignKey: 'userId' });
// Payment.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Payment;
