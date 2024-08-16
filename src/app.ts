require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

module.exports = app;
