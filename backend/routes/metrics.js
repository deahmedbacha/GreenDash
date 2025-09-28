const express = require('express');
const router = express.Router();

const {
  getAllData,
  getSummary,
  getByRegion,
  getCompliance,
  getTrends,
  getTopRegions,
  getCarbonLeaderboard,
  exportData,
  getForecast,
  getKpis
} = require('../controllers/metricsController');

// Raw data
router.get('/', getAllData);

// Aggregated summary
router.get('/summary', getSummary);

// Filter by region
router.get('/region/:region', getByRegion);

// Compliance check
router.get('/compliance', getCompliance);

// Trends (time series)
router.get('/trends', getTrends);

// Top regions by metric
router.get('/top', getTopRegions);

// Leaderboard (avg carbon intensity)
router.get('/leaderboard', getCarbonLeaderboard);

// Export CSV/JSON
router.get('/export', exportData);

// Simple forecast
router.get('/forecast', getForecast);
router.get('/kpis', getKpis);

module.exports = router;
