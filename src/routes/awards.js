const express = require('express');
const router = express.Router();
const { getAwardIntervals } = require('../services/awardService');

router.get('/awards', async (req, res) => {
    const result = await getAwardIntervals();
    res.json(result);
});

module.exports = router;