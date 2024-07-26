const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
},{ collection: 'Dashboard' });

module.exports = mongoose.model("Data",DataSchema); 
