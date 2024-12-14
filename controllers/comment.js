const Comment = require("../models/comment");

// Create a new comment
const createComment = async (req, res) => {
    try {
        const { postId, content, senderId } = req.body;
        if (!postId || !content || !senderId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newComment = await Comment.create({ postId, content, senderId });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createComment,

}