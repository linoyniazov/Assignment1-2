
import express from 'express';
const router = express.Router();
import postController from '../controllers/post';

router.post('/', postController.addPost); // Add a new post
router.get('/', postController.getAllPosts); // Get all posts or by sender

// router.get('/:id', postController.getPostById); // Get a post by ID

router.get("/:id", (req, res) => {
    postController.getPostById(req, res);
});

router.put('/:id', postController.updatePost); // Update a post by ID

export default router;