const express = require("express");
const StoriesRouter = express.Router();
const {
    GetTopStories,
} = require("../controller/storiesConroller");
const { isAuthenticated } = require("../middleware/auth");

StoriesRouter.get("/", isAuthenticated, GetTopStories);

module.exports = { StoriesRouter };
