const express = require("express");
const route = express.Router();

const AuthorController = require("../../app/controller/admin/AuthorController");

route.get("/:id/edit", AuthorController.edit);
route.post("/:id/update", AuthorController.update);
route.get("/create", AuthorController.create);
route.post("/store", AuthorController.store);
route.delete("/delete", AuthorController.delete);
route.use("/", AuthorController.home);

module.exports = route;
