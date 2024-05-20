const mongoose = require("mongoose");
const { FeedbackSchema, StorySchema } = require("../model");
const Feedback = mongoose.model("Feedback", FeedbackSchema);
const Story = mongoose.model("Story", StorySchema);
const FeedbackRepository = {
  Create(feedback) {
    return Feedback.create(feedback);
  },
  FindById(id) {
    return Feedback.findById(id).lean();
  },
  FeedbackList(id) {
    return Feedback.find().lean();
  },
  GetFeedbackList(story_id) {
    return Feedback.find({ story: story_id })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
  },
};

module.exports = FeedbackRepository;
