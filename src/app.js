const express = require('express');
const sequelize = require('./database');
const loadCsvData = require('./utils/csvManagement');
const awardRoutes = require('./routes/awards');

const app = express();
app.use(express.json());
app.use('/', awardRoutes);

async function init() {
    await sequelize.sync();
    await loadCsvData('./data/Movielist.csv');
}

module.exports = { app, init };