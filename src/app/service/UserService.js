const { UserRepository } = require("../repository");
const { SecurityUtil, FileUtil } = require("../utils");
const { StoragePath, StatusCode, Roles } = require("../constant");
const UserService = {
  async UpdatePassword(req) {
    const user_id = req.user.id;
    const user = await UserRepository.FindById(user_id);
    if (!user) {
      return StatusCode.NOT_FOUND;
    }
    let { current_pass, new_pass } = req.body;
    const is_valid_password = await SecurityUtil.Compare(
      current_pass,
      user.password
    );

    if (is_valid_password) {
      new_pass = await SecurityUtil.Hash(new_pass);
      try {
        return await UserRepository.Update(user_id, { password: new_pass });
      } catch (error) {
        return StatusCode.BAD_REQUEST;
      }
    } else {
      return StatusCode.BAD_REQUEST;
    }
  },
  GetAccountList() {
    return UserRepository.GetUserList();
  },
  async CreateAccount(req) {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }
    const email = req.body.email;
    const user_existed = await UserRepository.FindByEmail(email);
    if (user_existed) {
      return "user_existed";
    }
    req.body.password = await SecurityUtil.Hash(req.body.password);
    const user = {
      ...req.body,
    };
    try {
      return UserRepository.Create(user);
    } catch (error) {
      return false;
    }
  },
  async Register(req) {
    const email = req.body.email;
    const user_existed = await UserRepository.FindByEmail(email);
    if (user_existed) {
      return "user_existed";
    }
    req.body.password = await SecurityUtil.Hash(req.body.password);
    const user = {
      ...req.body,
    };
    user.role = "CLIENT";
    try {
      return UserRepository.CreateRegister(user);
    } catch (error) {
      return false;
    }
  },
  Delete(req) {
    const { account_id } = req.body;
    try {
      return UserRepository.Delete(account_id);
    } catch (error) {
      return false;
    }
  },
};

module.exports = UserService;
