const mongoose = require('mongoose');

const EnergyDataSchema = new mongoose.Schema({
  Date: { type: Date, required: true },
  Region: String,
  Fuel_Energy_Input_TJ: Number,
  Net_Electricity_Output_GWh: Number,
  Water_Use_m3: Number,
  Ash_Produced_t: Number,
  Renewable_Share: Number,
  Auxiliary_Power_Ratio: Number,
  LTIFR: Number,
  Noise_Level_dB: Number,
  Land_Use_m2_per_MWh: Number,
  Fuel_Type: String,
  CO2_Emissions_tCO2: Number,
  CH4_Emissions_tCO2e: Number,
  N2O_Emissions_tCO2e: Number,
  Thermal_Efficiency_pct: Number,
  Carbon_Intensity_gCO2_per_kWh: Number,
  Useful_Heat_TJ: Number,
  CHP_Utilization_pct: Number,
  Carbon_Cost_EUR_per_MWh: Number,
  Capacity_Factor_pct: Number
}, { collection: 'energydatas' });  // <-- Force exact collection name

module.exports = mongoose.model('EnergyData', EnergyDataSchema, 'energydatas');

EnergyDataSchema.index({ Region: 1, Date: -1 });
EnergyDataSchema.index({ Date: -1 });
EnergyDataSchema.index({ Carbon_Intensity_gCO2_per_kWh: 1 });
