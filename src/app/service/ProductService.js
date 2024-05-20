const { StoryRepository } = require("../repository");
const FileUtil = require("../utils/FileUtil");
const { StoragePath } = require("../constant");
const ProductService = {
  GetProductById(req) {
    const { story_id } = req.params;
    return StoryRepository.FindById(story_id);
  },
  async UpdateStory(req) {
    const { id } = req.params;
    const current = await StoryRepository.FindById(id);
    const story_update = {
      ...req.body,
    };
    if (req.file) {
      story_update.avatar = req.file.filename;
      if (current.avatar !== "thumbnail.png") {
        FileUtil.DeleteFile(StoragePath.AVATAR_STORAGE_PATH, current.avatar);
      }
    }
    try {
      return await StoryRepository.Update(id, story_update);
    } catch (error) {
      console.log("fail");
      return false;
    }
  },
};

module.exports = ProductService;
