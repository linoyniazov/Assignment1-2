import express, { Express } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
// const port = process.env.PORT;
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRoutes from "./routes/post";
import commentRouter from "./routes/comment";

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to the database");
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/post", postRoutes);

// app.use("/comments", commentRouter);

// const initApp = () => {
//   return new Promise(async (resolve, reject) => {
//     await mongoose.connect(process.env.DB_CONNECT);
//     resolve(app);
//   });
// };

const initApp = (): Promise<Express> => {
  return new Promise<Express>(async (resolve, reject) => {
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Connected to the database");
    });
    mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      app.use("/post", postRoutes);

      app.use("/comments", commentRouter);

      resolve(app);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

export default initApp;
