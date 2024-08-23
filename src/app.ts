require('dotenv').config();
import { Application } from "express";
const express = require("express");
const cors = require("cors");

const app:Application = express();
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