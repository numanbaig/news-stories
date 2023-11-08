const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendToken, accessTokenOptions, refreshTokenOptions } = require("../utils/jwt");
const { handleErrorResponse } = require("../middleware/errorHandler");
const { default: axios } = require("axios");

// Register User
const RegisterUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !password || !email || !confirmPassword) {
      return res
        .status(401)
        .send({ message: "Please enter name, password, email, and confirm password" });
    }
    // Validate the email format
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      return res.status(400).send({ message: "Invalid email format" });
    }
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Password and confirm password do not match" });
    }
    const isEmailExist = await UserModel.findOne({ email: email });

    if (isEmailExist) {
      return res.status(403).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword };
    const newUser = await UserModel.create(user);
    const sendUser = { name, email };
    try {
      if (newUser)
        return res
          .status(201)
          .send({ message: "User has been created Successfully", user: sendUser });
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  } catch (error) {
    return handleErrorResponse(res, error);
  }
});

// Login User
const LoginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "Please provide email and password" });
    }
    // check email
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
});

// update accesstoken
const UpdateAccessToken = asyncHandler(async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);
    if (!decoded) {
      return res.status(400).send({ message: "Could not refresh token" });
    }
    // user session means user data
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(400).send({ message: "Could not refresh token" });
    }
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: "1m" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "3d",
    });
    // req.user needs to be saved to use req?.user?._id; to find current user
    req.user = user;
    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    return res.status(200).send({
      message: accessToken,
    });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
});

// Logout user
const LogoutUser = asyncHandler((req, res) => {
  try {
    res.cookie("accessToken", "", { maxAge: 1 });
    res.cookie("refreshToken", "", { maxAge: 1 });
    return res.status(200).send({
      message: "Successfully logged out",
    });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
});

module.exports = {
  RegisterUser,
  LoginUser,
  LogoutUser,
  UpdateAccessToken,
};
