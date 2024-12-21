const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
// const port = process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/post");
const commentRouter = require("./routes/comment");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/post", postRoutes);

app.use("/comments", commentRouter);

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
const initApp = () => {
  return new Promise(async (resolve, reject) => {
    await mongoose.connect(process.env.DB_CONNECT);
    resolve(app);
  });
};

module.exports = initApp;
