const express = require("express");
const route = express.Router();

const AdminSiteController = require("../../app/controller/admin/AdminSiteController");

route.use("/", AdminSiteController.index);

module.exports = route;
