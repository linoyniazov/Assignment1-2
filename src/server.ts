import express, {Express} from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
// const port = process.env.PORT;
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRoutes from "./routes/post";
import commentRouter from "./routes/comment";
import authRouter from "./routes/auth";


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/post", postRoutes);

app.use("/comments", commentRouter);
app.use("/auth", authRouter);

// app.listen(port, () => {
//   console.log(Example app listening at http://localhost:${port});
// });
const initApp = () => {
  return new Promise<Express>(async (resolve, reject) => {
    if (process.env.DB_CONNECT === undefined) {
      reject("DB_CONNECT is not defined");
    } else {
      await mongoose.connect(process.env.DB_CONNECT);
      resolve(app);
    }
  });
};

export default initApp;