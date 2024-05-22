const mongoose = require("mongoose");
const { CategorySchema } = require("../../model");
const Category = mongoose.model("Category", CategorySchema);
const CategoryRepository = require("../../repository/CategoryRepository");
const StoryRepository = require("../../repository/StoryRepository");
const {
  CREATED,
  BAD_REQUEST,
  DELETED,
  UPDATED,
} = require("../../constant/StatusCode");

const CategoryController = {
  async home(req, res) {
    const category = await Category.find({});
    const role = req.user.role;
    const data = {
      role,
    };
    return res.render("admin/category/Manager_Category", {
      layout: "layout/portal/portal",
      category,
      data,
    });
  },
  async create(req, res) {
    const role = req.user.role;
    const data = {
      role,
    };
    return res.render("admin/category/Create_Category", {
      layout: "layout/portal/portal",
      data,
    });
  },
  async store(req, res) {
    const category = {
      ...req.body,
    };
    try {
      await CategoryRepository.Create(category);
      res.redirect("/admin/category");
    } catch (error) {
      res.send({ error });
    }
  },
  async edit(req, res) {
    const role = req.user.role;
    const category = await Category.findById(req.params.id);
    const data = {
      role,
    };
    return res.render("admin/category/Edit_Category", {
      layout: "layout/portal/portal",
      category,
      data,
    });
  },
  async update(req, res) {
    const { id } = req.params;
    const categories = {
      ...req.body,
    };
    const result = await CategoryRepository.Update(id, categories);
    if (result) {
      return res.redirect("admin/category");
    }
  },
  async delete(req, res) {
    const { category_id } = req.body;
    const CountCategoryById = await StoryRepository.GetCountCategoryId(
      category_id
    );
    console.log(CountCategoryById);
    if (CountCategoryById > 0) return res.status(200).send({ code: 333 });
    const categories = {
      ...req.body,
    };
    const result = await CategoryRepository.Delete(category_id, categories);
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

module.exports = CategoryController;
