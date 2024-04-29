const mongoose = require("mongoose");
const {StorySchema} = require('../../model');
const Story = mongoose.model("Story", StorySchema);
const {StoryRepository, CategoryRepository, AuthorRepository, ChapterRepository} = require("../../repository")
const {CREATED, BAD_REQUEST, DELETED, UPDATED} = require("../../constant/StatusCode");
const { ChapterList } = require("../../repository/ChapterRepository");
const ProductService = require("../../service/ProductService");



const ProductController =  {
    async home(req, res){
        const story = await Story.find({})
        const category_list = await CategoryRepository.CategoryList();
        const author_list = await AuthorRepository.AuthorList();
        const role = req.user.role
        const data = {
            role
        }
               return  res.render(
                'admin/product/Manager_Product',
                 {
                     layout: 'layout/portal/portal',
                     story,
                     category_list,
                     author_list,
                     data
                })
           ;
    },
     async create (req, res) {
        const category_list = await CategoryRepository.CategoryList();
        const author_list = await AuthorRepository.AuthorList();
        const role = req.user.role
        const data = {
            category_list,
            author_list,
            role
        }
        return res.render('admin/product/Create_Product',
            {
                layout: 'layout/portal/portal',
                data
            });
    },
    async store(req, res) {
        if(req.error_upload){
            return 'invalid avatar'
        }
        if(req.file){
            req.body.avatar = req.file.filename
        }
        const story = {
            ...
                req.body,
        }
        console.log(req.file)
        
        try{
            await StoryRepository.Create(story)
            res.redirect('/admin/product')
        } catch (error){
            res.send({error})
        }
    },
    async edit(req, res) {
        const category_list = await CategoryRepository.CategoryList();
        const author_list = await AuthorRepository.AuthorList();
        const story = await Story.findById(req.params.id)
        const role = req.user.role
        const data = {
            category_list,
            author_list,
            story,
            role 
        }
            return res.render('admin/product/Edit_Product', 
            {
                layout: 'layout/portal/portal',
                data
            })
    },
    async update(req, res) {
        const result = await ProductService.UpdateStory(req)
        if (result) {
            return res.redirect(`/admin/product/`)
        }else if(result)
        return res.status(200).json({code: BAD_REQUEST, message: 'updating story failed'})
    },
    async delete(req, res) {
        const {product_id} = req.body     
        const book = 
        {
            ...
            req.body
        }
        const result = await StoryRepository.Delete(product_id, book)
        const delete_chap = await ChapterRepository.DeleteChapInStory(product_id)
        const result_delete = {
            result, delete_chap
        }
        if (result_delete){
            return res.status(200).json({code: DELETED, message: 'deleted faculty successfully'})
        }return res.status(200).json({code: BAD_REQUEST, message: 'deleting faculty failed'})
    },
    async detail(req, res){
        const story = await Story.findById(req.params.id)
        const {id} = req.params
        const chap = await ChapterRepository.ChapterList(id)
        const role = req.user.role
        const view = await Story.findById(id)
        view.views++;
        await view.save(); 

        const data = {
            role, story, view
        }
        return res.render('admin/chap/Manager_Chap',
            {
                layout: 'layout/portal/portal',
                chap, id, data
            });
    },
}

module.exports = ProductController