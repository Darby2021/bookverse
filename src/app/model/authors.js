const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    name_author: { type: String, require: true },
    alias_author: { type: String },
    description_author: { type: String, require: true },
  },
  { timestamps: true }
);
module.exports = AuthorSchema;
