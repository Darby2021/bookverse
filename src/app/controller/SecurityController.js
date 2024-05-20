const { UserRepository } = require("../repository");
const { SecurityUtil, JWT } = require("../utils");
const { StatusCode } = require("../constant");

const SecurityController = {
  SignInPage(req, res) {
    return res.render("security/sign-in", { layout: false });
  },
  async SignIn(req, res) {
    const { email, password } = req.body;
    const user = await UserRepository.FindByEmail(email);
    if (user && (await SecurityUtil.Compare(password, user.password))) {
      const token = JWT.Create({
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        role: user.role,
      });
      return res
        .status(200)
        .json({
          code: StatusCode.OK,
          token,
          role: user.role,
          message: "Login success",
        });
    }
    return res
      .status(200)
      .json({ code: StatusCode.NOT_FOUND, message: "Not found user" });
  },
};

module.exports = SecurityController;
