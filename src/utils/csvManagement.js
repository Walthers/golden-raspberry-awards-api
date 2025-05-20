const fs = require('fs');
const csv = require('csv-parser');
const Movie = require('../models/Movie');

async function loadCsvData(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (data) => {
                results.push({
                    year: parseInt(data.year),
                    title: data.title,
                    studios: data.studios,
                    producers: data.producers,
                    winner: data.winner.trim().toLowerCase() === 'yes',
                });
            })
            .on('end', async () => {
                await Movie.bulkCreate(results);
                resolve();
            })
            .on('error', reject);
    });
}

module.exports = loadCsvData;