const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const URI = "mongodb://localhost:27017/easy-teacher";

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(URI, {
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Database is connected!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});