const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const isAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "No login account found" });
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid access token" });
      }
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { isAuthenticated };
