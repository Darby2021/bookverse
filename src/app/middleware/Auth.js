const JWT = require("../utils/JWT");
const Auth = {
  Authorize: (req, res, next, roles) => {
    const user = JWT.Verify(req.cookies.user_token);
    if (user && roles.includes(user.role)) {
      req.user = user;
      return next();
    }
    return res.render("security/unauthorized", { layout: false });
  },
};

module.exports = Auth;
