import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    senderId: { type: String, required: true },

});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
