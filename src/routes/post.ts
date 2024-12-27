import express, { Request, Response } from "express";
const router = express.Router();
import postController from "../controllers/post";

// router.post('/', postController.addPost); // Add a new post
// router.get('/', postController.getAllPosts); // Get all posts or by sender
// router.get('/:id', postController.getPostById); // Get a post by ID
// router.put('/:id', postController.updatePost); // Update a post by ID

router.post("/", (req: Request, res: Response) => {
  postController.addPost(req, res);
});
router.get("/", (req: Request, res: Response) => {
  postController.getAllPosts(req, res);
});
router.put("/:id", (req: Request, res: Response) => {
  postController.getPostById(req, res);
});
router.delete("/:id", (req: Request, res: Response) => {
  postController.updatePost(req, res);
});

export default router;
