const express = require("express");

const app = express();

const seats = require("./data/seats");

app.use(express.json());
app.use(express.static("public"));
