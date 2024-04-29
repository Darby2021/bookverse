const mongoose = require("mongoose");
const {StorySchema, CategorySchema, AuthorSchema } = require('../../model');
const Story = mongoose.model("Story", StorySchema);
const Category = mongoose.model("Category", CategorySchema);
const Author = mongoose.model("Author", AuthorSchema);
const {StoryRepository, CategoryRepository, AuthorRepository, ChapterRepository} = require("../../repository")
const AdminSiteController = {
    async index(req, res) {
        const story = await Story.find({});
        const category = await Category.find({});
        const author = await Author.find({});
        const story_len = await story.length;
        const category_len = await category.length;
        const author_len = await author.length;
        const role = req.user.role

        data = {
            story, category, author, story_len, category_len, author_len, role
        }
        return res.render(
            'admin/home-page-admin',
            {
                layout:'layout/portal/portal',
                data
            })
    },
}

module.exports =  AdminSiteController;