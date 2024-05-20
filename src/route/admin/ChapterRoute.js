const express = require("express");
const route = express.Router();

const ChapterController = require("../../app/controller/admin/ChapterController");

route.get("/:id/edit", ChapterController.edit);
route.post("/:id/update", ChapterController.update);
route.get("/:id/create", ChapterController.create);
route.post("/:id/store", ChapterController.store);
route.delete("/delete", ChapterController.delete);
// route.use('/', ChapterRoute.home);

module.exports = route;
