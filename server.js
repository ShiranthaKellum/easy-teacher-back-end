const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users");

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoutes);

mongoose.connect(uri, {
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Database is connected!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});