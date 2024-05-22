const mongoose = require("mongoose");
const { AuthorSchema, StorySchema } = require("../../model");
const Author = mongoose.model("Author", AuthorSchema);
const Story = mongoose.model("Story", StorySchema);
const AuthorRepository = require("../../repository/AuthorRepository");
const StoryRepository = require("../../repository/StoryRepository");
const {
  CREATED,
  BAD_REQUEST,
  DELETED,
  UPDATED,
} = require("../../constant/StatusCode");

const AuthorController = {
  async home(req, res) {
    const role = req.user.role;
    const data = {
      role,
    };
    const author = await Author.find({});
    return res.render("admin/author/Manager_Author", {
      layout: "layout/portal/portal",
      author,
      data,
    });
  },
  async create(req, res) {
    const role = req.user.role;
    const data = {
      role,
    };
    return res.render("admin/author/Create_Author", {
      layout: "layout/portal/portal",
      data,
    });
  },
  async store(req, res) {
    const author = {
      ...req.body,
    };
    try {
      await AuthorRepository.Create(author);
      res.redirect("/admin/author");
    } catch (error) {
      res.send({ error });
    }
  },
  async edit(req, res) {
    const role = req.user.role;
    const author = await Author.findById(req.params.id);
    const data = {
      role,
    };
    return res.render("admin/author/Edit_Author", {
      layout: "layout/portal/portal",
      author,
      data,
    });
  },
  async update(req, res) {
    const { id } = req.params;
    const authors = {
      ...req.body,
    };
    const result = await AuthorRepository.Update(id, authors);
    if (result) {
      return res.redirect("admin/author");
    }
  },
  async delete(req, res) {
    const { author_id } = req.body;
    const GetCountAuthorId = await StoryRepository.GetCountAuthorId(author_id);
    if (GetCountAuthorId > 0) return res.status(200).send({ code: 333 });
    const authors = {
      ...req.body,
    };
    const result = await AuthorRepository.Delete(author_id, authors);
    if (result) {
      return res
        .status(200)
        .json({ code: DELETED, message: "deleted faculty successfully" });
    }
    return res
      .status(200)
      .json({ code: BAD_REQUEST, message: "deleting faculty failed" });
  },
};

module.exports = AuthorController;
