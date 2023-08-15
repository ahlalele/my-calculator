const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
	expression: String,
	operation: String,
	result: Number,
});

const Calculation = mongoose.model("Calculation", calculationSchema);

module.exports = Calculation;
