const mongoose = require("mongoose");
const { UserService } = require("../service");
const { StatusCode } = require("../constant");
const { UserSchema, StorySchema } = require("../model");
const User = mongoose.model("User", UserSchema);
const Story = mongoose.model("Story", StorySchema);
const {
  StoryRepository,
  CategoryRepository,
  AuthorRepository,
  ChapterRepository,
  UserRepository,
} = require("../repository");

const ProFileController = {
  async ProfilePage(req, res) {
    const profile = req.user;
    const role = req.user.role;
    const SavedStories = await Story.find({ saveBy: profile.id });
    console.log(SavedStories);
    const data = {
      page_title: "Profile",
      profile,
      role,
      SavedStories,
    };
    return res.render("profile/profile-page", {
      layout: "layout/portal/portal",
      data,
    });
  },
  async ChangePassword(req, res) {
    const result_update = await UserService.UpdatePassword(req);

    if (result_update === StatusCode.NOT_FOUND) {
      return res.status(200).json({
        code: StatusCode.BAD_REQUEST,
        message: `not found user with email: ${req.user.email}`,
      });
    } else if (result_update === StatusCode.BAD_REQUEST) {
      return res.status(200).json({
        code: StatusCode.BAD_REQUEST,
        message: `current password is wrong!`,
      });
    } else if (result_update) {
      return res.status(200).json({
        code: StatusCode.UPDATED,
        message: `Updated password successfully!`,
      });
    }
    return res.status(200).json({
      code: StatusCode.BAD_REQUEST,
      message: `Updating password failed!`,
    });
  },
};

module.exports = ProFileController;
