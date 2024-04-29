const mongoose = require("mongoose");
const {CategorySchema} = require("../model");
const Category = mongoose.model("Category", CategorySchema);
const CategoryRepository = {
    Create(category){
        return Category.create(category)
    },
    Update(id, categories) {
        return Category.updateOne({ _id:id}, categories).lean()
    },
    Delete(id) {
        return Category.deleteOne({_id:id}, {deleted: true})
    },
    CategoryList() {
        return Category.find({}).lean()
    },
}

module.exports = CategoryRepository