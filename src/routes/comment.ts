import express, { Request, Response } from "express";
import commentsController from "../controllers/comment";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  commentsController.createComment(req, res);
});
router.get("/:postId?", (req: Request, res: Response) => {
  commentsController.getComments(req, res);
});
router.put("/:id", (req: Request, res: Response) => {
  commentsController.updateComment(req, res);
});
router.delete("/:id", (req: Request, res: Response) => {
  commentsController.deleteComment(req, res);
});


export default router;
