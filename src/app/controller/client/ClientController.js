const mongoose = require("mongoose");
const {
  StorySchema,
  ChapterSchema,
  UserSchema,
  CategorySchema,
  FeedbackSchema,
} = require("../../model");
const Story = mongoose.model("Story", StorySchema);
const Chap = mongoose.model("Chapter", ChapterSchema);
const User = mongoose.model("User", UserSchema);
const Category = mongoose.model("Category", CategorySchema);
const Feedback = mongoose.model("Feedback", FeedbackSchema);
const {
  FeedbackRepository,
  ChapterRepository,
  StoryRepository,
  UserRepository,
} = require("../../repository");

//Controller function
const ClientController = {
  async home(req, res) {
    const role = req.user.role;
    let stories;
    const keyword = req.query.keyword;
    if (keyword) {
      try {
        stories = await Story.find({
          name_story: { $regex: keyword, $options: "i" },
        });
      } catch (error) {
        return res.render("layout/not-found", { layout: false });
      }
    } else {
      stories = await Story.find({});
    }
    let category;
    category = await Category.findOne({ name_category: "Adventure" });
    if (!category) {
      return res.status(404).send("Not category");
    } else {
      category = await Story.find({ category: category._id });
    }
    let categoryAfi;
    categoryAfi = await Category.findOne({ name_category: "Art" });
    if (!categoryAfi) {
      return res.status(404).send("Not category");
    } else {
      categoryAfi = await Story.find({ category: categoryAfi._id });
      console.log(categoryAfi);
    }
    const data = {
      role,
      stories,
      category,
      categoryAfi,
    };

    return res.render("client/home", {
      layout: "layout/portal/portal",
      data,
    });
  },
  async DetailProduct(req, res) {
    const { id } = req.params;
    const feedback_list = await FeedbackRepository.GetFeedbackList(id);
    const role = req.user.role;
    const story = await Story.findById(req.params.id);
    const chap = await ChapterRepository.ChapterList(id);
    const view = await Story.findById(id);
    view.views++;
    await view.save();
    const data = {
      story,
      role,
      chap,
      feedback_list,

    };
    return res.render("client/detail-product", {
      layout: "layout/portal/portal",
      data,
    });
  },
  async ReadBook(req, res) {
    const role = req.user.role;
    const data = {
      role,
    };
    try {
      const chap = await Chap.findById(req.params.id);

      if (!chap) {
        return res.render("layout/not-found", { layout: false });
      }
      return res.render("client/read-chap-product", {
        layout: "layout/portal/portal",
        chap,
        data,
      });
    } catch (error) {
      return res.render("layout/not-found", { layout: false });
    }
  },
  async ReadNext(req, res) {
    const currentChapterId = req.params.currentChapterId;
    const currentChapter = await Chap.findById(currentChapterId);
    if (!currentChapter) {
      return res.status(404).send("Chapter does not exist.");
    }
    const nextChapter = await Chap.findOne({
      number_chap: currentChapter.number_chap + 1,
    });

    if (!nextChapter) {
      return res.status(404).send("This is the final show.");
    }
    res.redirect(`/client/${nextChapter._id}/read`);
  },
  async PreviousNext(req, res) {
    const currentChapterId = req.params.currentChapterId;
    const currentChapter = await Chap.findById(currentChapterId);

    if (!currentChapter) {
      return res.status(404).send("Chapter does not exist.");
    }
    const previousChapter = await Chap.findOne({
      number_chap: currentChapter.number_chap - 1,
    });

    if (!previousChapter) {
      return res.status(404).send("Can nott go back anymore");
    }
    res.redirect(`/client/${previousChapter._id}/read`);
  },
  async SaveBook(req, res) {
    const role = req.user.role;
    const data = {
      role,
    };
    try {
      const story = await Story.findById(req.params.id);
      if (!story) return res.status(404).send("Story n fotound"); // Find users in the database
      const user = await User.findOne({ email: req.user.email });
      if (!user) return res.status(404).send("User not found"); // Check if the user has saved this story
      const alreadySaved = story.saveBy.includes(user._id);
      if (alreadySaved) return res.redirect("/profile"); // Add the user to the story saved list and save it back to the database
      story.saveBy.push(user._id);
      await story.save();
      res.redirect("/profile");
      return res.render("client/home", {
        layout: "layout/portal/portal",
        story,
        data,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
  async follow(req, res) {
    const role = req.user.role;
    const data = {
      role,
    };
    try {
      const story = await Story.findById(req.params.id);
      if (!story) return res.status(404).send("Story n fotound");
      const user = await User.findOne({ email: req.user.email });
      if (!user) return res.status(404).send("User not found");
      const alreadySaved = story.follow.includes(user._id);
      if (alreadySaved) return res.status(404).send("follow already exists");
      story.follow.push(user._id);
      await story.save(user._id);
      res.status(404).send("You have successfully followed");
      return res.render("client/home", {
        layout: "layout/portal/portal",
        story,
        data,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
  async unfollow(req, res) {
    const role = req.user.role;
    const data = {
      role,
    };
    try {
      const story = await Story.findById(req.params.id);
      if (!story) return res.status(404).send("Story n fotound");
      const user = await User.findOne({ email: req.user.email });
      if (!user) return res.status(404).send("User not found");
      const alreadySaved = story.follow.includes(user._id);
      if (alreadySaved) {
        story.follow.remove(user._id);
        await story.save();
        return res.status(404).send("You have successfully unfollowed");
      }
      res.status(404).send("Books you have unfollowed");
      return res.render("client/home", {
        layout: "layout/portal/portal",
        story,
        data,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
  async about(req, res) {
    const role = req.user.role;
    const data = {
      role,
    };
    return res.render("client/about", { layout: "layout/portal/portal", data });
  },
  async CreateFeedback(req, res) {
    const story_list = await StoryRepository.StoryList();
    const story = await Story.findById(req.params.id);
    const role = req.user.role;
    const data = {
      role,
      story,
      story_list,
    };
    return res.render("client/feedback", {
      layout: "layout/portal/portal",
      data,
    });
  },
  async StornFeedback(req, res) {
    const user_id = req.user.id;
    const story_id = req.params.id;
    const { content } = req.body;
    const feedback = {
      story: story_id,
      user: user_id,
      content,
    };
    try {
      await FeedbackRepository.Create(feedback);
      res.redirect(`/client/${story_id}/detail-product`);
    } catch (error) {
      res.send({ error });
    }
  },
};

module.exports = ClientController;
