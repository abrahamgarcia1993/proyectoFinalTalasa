const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Exam = require('./Exam'); // Asegúrate de ajustar el camino a tu archivo Exam.js

const Question = sequelize.define('Question', {
  questionText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  examId: {
    type: DataTypes.INTEGER,
    references: {
      model: Exam,
      key: 'id',
    },
    allowNull: false,
  },
});

Question.associate = (models) => {
  Question.belongsTo(models.Exam, { foreignKey: 'examId', as: 'exam' });
};

module.exports = Question;