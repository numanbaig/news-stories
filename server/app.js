const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { UserRouter } = require("./routes/userRoutes");
const { StoriesRouter } = require("./routes/storiesRoutes");

const BASE_URL = '/api/v1'

// body parser
app.use(express.json());

// cookie parser for cookies
app.use(cookieParser());

// cors
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

// user routes;
app.use(`${BASE_URL}/auth`, UserRouter);

// stories routes;
app.use(`${BASE_URL}/stories`, StoriesRouter);

app.get("/cookie", (req, res) => {
  const cookieValue = req.cookies.testing;
  if (cookieValue) {
    return res.status(200).send({ message: "Cookie received", cookieValue });
  } else {
    return res.status(200).send({ message: "No cookie found" });
  }
});

app.get("/test", (req, res) => {
  return res.status(200).send({ messasge: "Great api working" });
});

app.all("*", (req, res) => {
  return res
    .status(404)
    .send({ messasge: req.originalUrl + " Route not match , Kindly check api endpoints again" });
});

module.exports = { app };
