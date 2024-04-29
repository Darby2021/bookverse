const mongoose = require("mongoose");
const {ChapterSchema} = require('../../model');
const Chapter = mongoose.model("Chapter", ChapterSchema);

const {StorySchema}= require('../../model');
const Story = mongoose.model("Story", StorySchema);

const ChapterRepository = require('../../repository/ChapterRepository')
const {CREATED, BAD_REQUEST, DELETED, UPDATED} = require("../../constant/StatusCode");
const { StoryRepository } = require("../../repository");


const ChapterController =  {
    async create(req, res) { 
        const {id} = req.params
        const chap = await ChapterRepository.ChapterList(id)
        const role = req.user.role
        const data = {
            role
        }
        return res.render('admin/chap/Create_Chap',
        {
            layout: 'layout/portal/portal',
            chap,
            id, 
            data
        });
    },
    async store(req, res) {
        const {id} = req.params
        await ChapterRepository.ChapterList(id)
        const  chapter= {
            ... req.body
        }
        if(chapter)
            await ChapterRepository.Create(chapter)
            res.redirect(`/admin/product/${id}/detail`)
    },
    async edit(req, res) {
       const story_list = await StoryRepository.StoryList();
       const chap = await Chapter.findById( req.params.id)
       const role = req.user.role
       const data = {
        story_list,
        chap,
        role
       }
        return res.render('admin/chap/Edit_Chap', 
            {
                layout: 'layout/portal/portal',
                data
            })  
    },
    async update(req, res) {
        const {id} = req.params
        const chaps = 
        {
            ...
            req.body
        }
        const result = await ChapterRepository.Update(id, chaps)
        if(result){
            return res.redirect(`/admin/product/`)
        }
    },
    async delete(req, res) {
        const {chap_id} = req.body
        const chaps = 
        {
            ...
            req.body
        }
        const result = await ChapterRepository.Delete(chap_id, chaps)
        if (result){
            return res.status(200).json({code: DELETED, message: 'deleted faculty successfully'})
        }return res.status(200).json({code: BAD_REQUEST, message: 'deleting faculty failed'})
    }
}

module.exports = ChapterController