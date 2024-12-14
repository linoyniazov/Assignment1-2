const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    senderId: { type: String, required: true },

});

module.exports = mongoose.model('Comment', commentSchema);
