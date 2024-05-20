const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChapterSchema = new Schema(
  {
    number_chap: { type: Number, require: true },
    context: { type: String, require: true },
    description_chap: { type: String, require: true },
    story: {
      type: Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = ChapterSchema;
