const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const EnergyData = require('./models/EnergyData');
require('dotenv').config();

async function importCSV() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB");

  const results = [];
  fs.createReadStream('./energy_data_output_2.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
    await EnergyData.collection.insertMany(results);
      console.log("CSV imported successfully!");
      mongoose.disconnect();
    });
}

importCSV();
