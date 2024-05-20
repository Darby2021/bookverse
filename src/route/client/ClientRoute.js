const express = require("express");
const route = express.Router();

const ClientController = require("../../app/controller/client/ClientController");

route.get("/chapter/:currentChapterId/previous", ClientController.PreviousNext);
route.get("/chapter/:currentChapterId/next", ClientController.ReadNext);
route.get("/:id/follow", ClientController.follow);
route.get("/:id/unfollow", ClientController.unfollow);
route.get("/:id/save", ClientController.SaveBook);
route.get("/:id/read", ClientController.ReadBook);
route.get("/:id/detail-product", ClientController.DetailProduct);
route.get("/about", ClientController.about);
route.get("/feedback", ClientController.CreateFeedback);
route.post("/:id/feedbackInfo", ClientController.StornFeedback);
route.get("/", ClientController.home);

module.exports = route;
