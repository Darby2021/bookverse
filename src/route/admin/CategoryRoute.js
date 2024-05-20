const express = require("express");
const route = express.Router();

const CategoryController = require("../../app/controller/admin/CategoryController");

route.get("/:id/edit", CategoryController.edit);
route.post("/:id/update", CategoryController.update);
route.get("/create", CategoryController.create);
route.post("/store", CategoryController.store);
route.delete("/delete", CategoryController.delete);
route.use("/", CategoryController.home);
module.exports = route;
