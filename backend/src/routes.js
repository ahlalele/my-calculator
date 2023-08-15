const express = require('express');
const calculationModel = require('./models.js');
const app = express();

app.post("/add_calculation", async (request, response) => {
	try {
		const calculation = new calculationModel(request.body);

		const finalCalc = await calculation.save();
		response.send({
            expression: finalCalc.expression,
            operation: finalCalc.operation,
			result: finalCalc.result,
		});
	} catch (err) {
		response.status(500).send(err);
	}
});

app.get("/calculations", async (request, response) => {
	try {
		const calculations = await calculationModel.find();
		response.send(calculations);
	} catch (err) {
		response.status(500).send(err);
	}
});

module.exports = app;