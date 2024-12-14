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
// Get comments, filter by postId if provided
const getComments = async (req, res) => {
    try {
        const { postId } = req.query;

        // If postId is provided, filter by it; otherwise, return all comments
        const filter = postId ? { postId } : {};
        const comments = await Comment.find(filter);

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
        if (!comment) return res.status(404).send("Comment not found");
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) return res.status(404).send("Comment not found");
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment,

}