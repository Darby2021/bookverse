const mongoose = require("mongoose");
const { ChapterSchema } = require("../model");
const Chapter = mongoose.model("Chapter", ChapterSchema);
const ChapterRepository = {
  Create(chap) {
    return Chapter.create(chap);
  },
  Update(id, chaps) {
    return Chapter.updateOne({ _id: id }, chaps).lean();
  },
  Delete(id) {
    return Chapter.deleteOne({ _id: id }, { deleted: true });
  },
  DeleteChapInStory(id) {
    return Chapter.deleteMany({ story: id }, { delete: true });
  },
  FindById(id) {
    return Chapter.findById(id).lean();
  },
  ChapterList(id) {
    return Chapter.find({ story: id }).populate("story").lean();
  },
};

module.exports = ChapterRepository;
