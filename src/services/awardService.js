const Movie = require('../models/Movie');

function parseProducers(producerString) {
    return producerString
        .split(/,| and /i)
        .map(p => p.trim())
        .filter(Boolean);
}

function calculateIntervals(producerWins) {
    const intervals = [];

    for (const [producer, years] of Object.entries(producerWins)) {
        if (years.length < 2) continue;

        const sortedYears = [...years].sort((a, b) => a - b);

        for (let i = 1; i < sortedYears.length; i++) {
            const previousWin = sortedYears[i - 1];
            const followingWin = sortedYears[i];

            intervals.push({
                producer,
                interval: followingWin - previousWin,
                previousWin,
                followingWin,
            });
        }
    }

    return intervals;
}

function getProducersWithMultipleWins(winners) {
    const winsByProducer = new Map();

    for (const movie of winners) {
        const producers = parseProducers(movie.producers);

        for (const producer of producers) {
            const wins = winsByProducer.get(producer) || [];

            wins.push(movie.year);
            winsByProducer.set(producer, wins);
        }
    }

    return Object.fromEntries(winsByProducer);
}

async function getAwardIntervals() {
    const winningMovies = await Movie.findAll({
        where: { winner: true },
        raw: true,
    });

    const groupedWins = getProducersWithMultipleWins(winningMovies);
    const allIntervals = calculateIntervals(groupedWins);

    if (allIntervals.length === 0) return { min: [], max: [] };

    const minInterval = Math.min(...allIntervals.map(i => i.interval));
    const maxInterval = Math.max(...allIntervals.map(i => i.interval));

    const shortestIntervals = allIntervals.filter(i => i.interval === minInterval);
    const longestIntervals = allIntervals.filter(i => i.interval === maxInterval);

    return {
        min: shortestIntervals,
        max: longestIntervals,
    };
}

module.exports = { getAwardIntervals };