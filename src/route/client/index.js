const express = require("express");
const route = express.Router();

const ClientRoute = require("./ClientRoute");

route.use("/", ClientRoute);

module.exports = route;
