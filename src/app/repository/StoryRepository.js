const mongoose = require("mongoose");
const { StorySchema } = require("../model");
const { SecurityUtil, FileUtil } = require("../utils");
const { StoragePath, StatusCode, Roles } = require("../constant");

const Story = mongoose.model("Story", StorySchema);

const StoryRepository = {
  Create(story) {
    return Story.create(story);
  },
  FindById(id) {
    return Story.findById(id).lean();
  },

  FindByEmail(email) {
    return Story.findOne({ email, deleted: false }).lean();
  },
  Update(id, book) {
    return Story.updateOne({ _id: id }, book).lean();
  },
  Delete(id) {
    return Story.deleteOne({ _id: id }, { deleted: true });
  },
  StoryList() {
    return Story.find({}).lean();
  },
  GetChapterOfStory(story_id) {
    return Story.findOne({ _id: story_id })
      .select("chapter")
      .populate("chapters")
      .lean();
  },
};
module.exports = StoryRepository;
