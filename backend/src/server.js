const express = require('express');
const app = express();
const Router = require('./routes');
const mongoose = require('mongoose');
const port = 27017;

app.use(express.json())

const uri = "mongodb://localhost:27017/calculatorDB";

mongoose.connect(uri,
{
	useNewUrlParser: true, //avoid deprecation warning
	useUnifiedTopology: true,
}
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
    console.log("Connected successfully");
});

app.use(Router)


app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
});
