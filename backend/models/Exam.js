const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Course = require('./Course');

const Exam = sequelize.define('Exam', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  questions: {
    type: DataTypes.JSON, // Suponiendo que almacenaremos preguntas como un objeto JSON
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, // Duración en minutos
    allowNull: false,
  },
  validityDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valuePerQuestion: {
    type: DataTypes.INTEGER, // Valor por pregunta en puntos
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
  },
});

module.exports = Exam;
