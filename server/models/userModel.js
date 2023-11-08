const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter your name"],
    },
    email: {
      type: String,
      require: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

Schema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || " ", { expiresIn: "1m" });
};
Schema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || " ", { expiresIn: "3d" });
};
const UserModel = mongoose.model("UserModel", Schema);
module.exports = UserModel;
