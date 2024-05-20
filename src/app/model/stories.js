const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema(
  {
    name_story: { type: String, required: true },
    alias_story: { type: String, required: true },
    views: { type: Number, default: 0 },
    status: { type: String, default: "No Active", required: true },
    description: { type: String },
    avatar: { type: String, default: "thumbnail.png" },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    chapter: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    saveBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    follow: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
module.exports = StorySchema;
