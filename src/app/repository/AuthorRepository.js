const mongoose = require("mongoose");
const { AuthorSchema } = require("../model");
const Author = mongoose.model("Author", AuthorSchema);
const AuthorRepository = {
  Create(author) {
    return Author.create(author);
  },
  Update(id, authors) {
    return Author.updateOne({ _id: id }, authors).lean();
  },
  Delete(id) {
    return Author.deleteOne({ _id: id }, { deleted: true });
  },
  AuthorList() {
    return Author.find({}).lean();
  },
};

module.exports = AuthorRepository;
