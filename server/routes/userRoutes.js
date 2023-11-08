const express = require("express");
const UserRouter = express.Router();
const {
  RegisterUser,
  LoginUser,
  LogoutUser,
  UpdateAccessToken,
  GetTopStories,
} = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");

UserRouter.post("/user-registration", RegisterUser);

UserRouter.post("/user-login", LoginUser);

UserRouter.get("/logout", LogoutUser);

UserRouter.get("/refresh-token", UpdateAccessToken);

module.exports = { UserRouter };
