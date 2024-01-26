const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const contractAPIRoutes = require("./routes/contract-API");
const smartContractAPIRoutes = require("./routes/smart-contract-API");
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000,
  })
);

// use the routes specified in route folder
app.use("/", contractAPIRoutes);
app.use("/", smartContractAPIRoutes);

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

//listen to the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Backend Server running on port ${port}.`);
});
