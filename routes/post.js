const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/', postController.addPost); // Add a new post
router.get('/', postController.getAllPosts); // Get all posts or by sender

module.exports = router;