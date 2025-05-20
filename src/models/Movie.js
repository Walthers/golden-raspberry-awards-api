const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Movie = sequelize.define('Movie', {
    year: DataTypes.INTEGER,
    title: DataTypes.STRING,
    studios: DataTypes.STRING,
    producers: DataTypes.STRING,
    winner: DataTypes.BOOLEAN
});

module.exports = Movie;