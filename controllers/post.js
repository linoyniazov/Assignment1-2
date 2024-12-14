const Post = require('../models/post');

/**
 * Add a new post
 */
const addPost = async (req, res) => {
    try {
        const { content, senderId } = req.body;

        if (!content || !senderId) {
            return res.status(400).json({ message: 'Fields content and senderId are required' });
        }

        const newPost = new Post({
            content,
            senderId,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Get all posts or posts by sender
 */
const getAllPosts = async (req, res) => {
    try {
        const { sender } = req.query;

        let posts;
        if (sender) {
            posts = await Post.find({ senderId: sender }); // Filter by sender
        } else {
            posts = await Post.find(); // Get all posts
        }

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
   
    getAllPosts,
    addPost,
   
};