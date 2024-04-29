const mongoose = require("mongoose");
const {StorySchema, ChapterSchema, UserSchema, CategorySchema} = require('../../model');
const Story = mongoose.model("Story", StorySchema);
const Chap = mongoose.model("Chapter", ChapterSchema);
const User = mongoose.model('User', UserSchema);
const Category = mongoose.model('Category', CategorySchema);

const {ChapterRepository, StoryRepository} = require('../../repository')

const ClientController =  {
    async home(req, res){
        const role = req.user.role
        let stories;
        const keyword = req.query.keyword; 
        if(keyword){
            try{
                stories = await Story.find({ 
                        name_story: { $regex: keyword, $options: 'i' } 
                    });
                } catch (error) {
                    return res.render(
                        'layout/not-found',
                        {layout: false}
                    ) 
                }
            } else {stories = await Story.find({})}

        let category;
        category = await Category.findOne({ name_category: 'Adventure'})
        if (!category) {
            // Tìm các câu chuyện có category là id của thể loại 'Drama'
            return res.status(404).send('Not category');
        } else {
            // Nếu không tìm thấy thể loại 'Drama', xử lý tại đây
           category = await Story.find({ category: category._id });         
        }


        let categoryAfi;
        categoryAfi = await Category.findOne({ name_category: 'Art'})  
        if (!categoryAfi) {
            // Tìm các câu chuyện có category là id của thể loại 'Drama'
            return res.status(404).send('Not category');
        } else {
            // Nếu không tìm thấy thể loại 'Drama', xử lý tại đây
            categoryAfi = await Story.find({ category: categoryAfi._id });        
            console.log(categoryAfi)  
        }

        const data ={
            role, stories, category, categoryAfi
        } 

        return res.render(
            'client/home', 
            {
                layout:'layout/portal/portal',
                 data
           })    
    },

    async DetailProduct(req, res){
        const role = req.user.role
        const story = await Story.findById(req.params.id)
        const {id} = req.params
        const chap = await ChapterRepository.ChapterList(id)
        const view = await Story.findById(id)
            view.views++;
            await view.save();  
        const data = {
            story,role,
            chap
        }
        return res.render(
            'client/detail-product',
        {
            layout:'layout/portal/portal',
            data
       })     
    },
    async ReadBook(req, res){
        const role = req.user.role
        const data = {
            role
        }
        try{
            const chap = await Chap.findById(req.params.id)
                   
        if(!chap){
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }
            return res.render(
                'client/read-chap-product', 
            {
                layout:'layout/portal/portal',
                chap, data
           })
        } catch(error){
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }
    },
    async SaveBook(req, res){
        const role = req.user.role
        const data = {
            role
        }
        try {
            const story = await Story.findById(req.params.id);
            if (!story) return res.status(404).send('Story n fotound');
            // Find users in the database
            const user = await User.findOne({ email: req.user.email });
            if (!user) return res.status(404).send('User not found');
            // Check if the user has saved this story
            const alreadySaved = story.saveBy.includes(user._id);
            if (alreadySaved) return res.redirect('/profile')
            // Add the user to the story saved list and save it back to the database
            story.saveBy.push(user._id);
            await story.save();
            res.redirect('/profile')

            return res.render(
                'client/home', 
                {
                    layout:'layout/portal/portal',
                    story, data
               })  
          } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
          }
    },

    async follow(req, res){
        const role = req.user.role
        const {id} = req.params
        const story = await Story.findById(req.params.id)
        const chap = await ChapterRepository.ChapterList(id)
        const data = {
            role, story, chap
        }
        return res.render(
        'client/detail-product',
        {
        layout:'layout/portal/portal',
        data
    })   
    },
    async about(req, res){
        const role = req.user.role
        const data = {
            role
        }
        return res.render('client/about',{layout:'layout/portal/portal', data})
        
    }
}

module.exports = ClientController
