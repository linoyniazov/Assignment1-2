import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
