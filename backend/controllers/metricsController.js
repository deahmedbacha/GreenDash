const { get } = require('mongoose');
const EnergyData = require('../models/EnergyData');
const { Parser } = require('json2csv');
const ALLOWED_METRICS = [
  'CO2_Emissions_tCO2',
  'CH4_Emissions_tCO2e',
  'N2O_Emissions_tCO2e',
  'Thermal_Efficiency_pct',
  'Carbon_Intensity_gCO2_per_kWh',
  'Net_Electricity_Output_GWh',
  'Fuel_Energy_Input_TJ'
];

// Get all records (limited for performance)
// Get all records with pagination + filters
const getAllData = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '50', 10);
    const skip = (page - 1) * limit;

    // Optional filters
    const q = {};
    if (req.query.region) q.Region = req.query.region;
    if (req.query.from || req.query.to) {
      q.Date = {
        ...(req.query.from ? { $gte: new Date(req.query.from) } : {}),
        ...(req.query.to ? { $lte: new Date(req.query.to) } : {})
      };
    }

    const data = await EnergyData.find(q).skip(skip).limit(limit).sort({ Date: -1 });
    const total = await EnergyData.countDocuments(q);

    res.json({ page, limit, total, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Summary aggregated by region
const getSummary = async (_req, res) => {
  try {
    const summary = await EnergyData.aggregate([
      {
        $group: {
        _id: "$Region",
        avgEfficiency: { $avg: { $toDouble: "$Thermal_Efficiency_pct" } },
        avgCarbonIntensity: { $avg: { $toDouble: "$Carbon_Intensity_gCO2_per_kWh" } },
        totalCO2: { $sum: { $toDouble: "$CO2_Emissions_tCO2" } },
        avgRenewable: { $avg: { $toDouble: "$Renewable_Share" } },
        avgCapacityFactor: { $avg: { $toDouble: "$Capacity_Factor_pct" }}
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filter by region
const getByRegion = async (req, res) => {
  try {
    const region = req.params.region;
    const limit = parseInt(req.query.limit || '200', 10);
    const data = await EnergyData.find({ Region: region }).limit(limit);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Simple compliance check (example thresholds; tweak later)
const getCompliance = async (_req, res) => {
  try {
    const breaches = await EnergyData.find({
      $or: [
        { Carbon_Intensity_gCO2_per_kWh: { $gt: 800000 } }, // sample threshold
        { Thermal_Efficiency_pct: { $lt: 35 } }              // sample threshold
      ]
    }).limit(1000);

    res.json({
      nonCompliantCount: breaches.length,
      sampleRecords: breaches.slice(0, 10)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Time series trends for a metric
const getTrends = async (req, res) => {
  try {
    const { region, metric } = req.query;
    if (!metric) return res.status(400).json({ error: "metric is required, e.g. CO2_Emissions_tCO2" });
if (metric && !ALLOWED_METRICS.includes(metric)) {
  return res.status(400).json({ error: 'Invalid metric' });
}

    const match = region ? { Region: region } : {};
    const trends = await EnergyData.aggregate([
      { $match: match },
{ $project: { Date: 1, value: { $toDouble: `$${metric}` } } },
      { $sort: { Date: 1 } }
    ]);
    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Top regions by a summed metric
const getTopRegions = async (req, res) => {
  try {
    const { metric, limit = 5 } = req.query;
    if (!metric) return res.status(400).json({ error: "metric is required, e.g. CO2_Emissions_tCO2" });
if (metric && !ALLOWED_METRICS.includes(metric)) {
  return res.status(400).json({ error: 'Invalid metric' });
}

    const result = await EnergyData.aggregate([
      { $group: { _id: "$Region", total: { $sum: `$${metric}` } } },
      { $sort: { total: -1 } },
      { $limit: parseInt(limit, 10) }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Leaderboard by average carbon intensity (lower is better)
const getCarbonLeaderboard = async (_req, res) => {
  try {
    const leaderboard = await EnergyData.aggregate([
      { $group: { _id: "$Region", avgCarbon: { $avg: "$Carbon_Intensity_gCO2_per_kWh" } } },
      { $sort: { avgCarbon: { $avg: { $toDouble: "$Carbon_Intensity_gCO2_per_kWh" } }
 } }
    ]);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export as CSV or JSON
const exportData = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || '500', 10);
    const data = await EnergyData.find().limit(limit).lean();

    if (req.query.format === "csv") {
      const parser = new Parser();
      const csv = parser.parse(data);
      res.header('Content-Type', 'text/csv');
      res.attachment('sustainability_report.csv');
      return res.send(csv);
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Simple moving-average forecast for next day
const getForecast = async (req, res) => {
  try {
    const { region, metric } = req.query;
    if (!metric) return res.status(400).json({ error: "metric is required, e.g. CO2_Emissions_tCO2" });
if (metric && !ALLOWED_METRICS.includes(metric)) {
  return res.status(400).json({ error: 'Invalid metric' });
}

    const match = region ? { Region: region } : {};
    const records = await EnergyData.aggregate([
      { $match: match },
      { $project: { Date: 1, value: { $toDouble: `$${metric}` } } },
      { $sort: { Date: 1 } }
    ]);

    const values = records.map(r => r.value).filter(v => typeof v === 'number');
    if (values.length < 7) return res.json({ forecast_next_day: null, note: "Not enough data for 7-day MA" });

    const last7 = values.slice(-7);
    const forecast = last7.reduce((a, b) => a + b, 0) / last7.length;

    res.json({
      metric,
      region: region || "ALL",
      method: "7-day moving average",
      forecast_next_day: forecast
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getKpis = async (req, res) => {
  try {
    const kpis = await EnergyData.aggregate([
      {
        $group: {
          _id: null,
          totalCO2: { $sum: { $toDouble: "$CO2_Emissions_tCO2" } },
          avgCI: { $avg: { $toDouble: "$Carbon_Intensity_gCO2_per_kWh" } },
          avgEff: { $avg: { $toDouble: "$Thermal_Efficiency_pct" } },
          avgRenewable: { $avg: { $toDouble: "$Renewable_Share" } }
        }
      }
    ]);
    res.json(kpis[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




module.exports = {
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
};
