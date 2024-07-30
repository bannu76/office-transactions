const db = require("./db/database");
const getTransactionData = require("./routes/transaction");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

const initializeDBAndServer = () => {
  try {
    db();
    app.listen(process.env.PORT || 4000, () => {
      console.log("server is running");
    });
  } catch (e) {
    console.log(e);
  }
};

app.use("/", getTransactionData);
initializeDBAndServer();
