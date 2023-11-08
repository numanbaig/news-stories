const asyncHandler = require("express-async-handler");
const { handleErrorResponse } = require("../middleware/errorHandler");
const { default: axios } = require("axios");

// Get top Stories
const GetTopStories = asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NY_TS_URL}`
    );
    const topStories = response.data.results;
    return res.status(200).send({ message: "Successfully Fetched Data", topStories });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
});

module.exports = {
  GetTopStories,
};
