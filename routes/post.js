const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/', postController.addPost); // Add a new post
router.get('/', postController.getAllPosts); // Get all posts or by sender
router.get('/:id', postController.getPostById); // Get a post by ID

module.exports = router;