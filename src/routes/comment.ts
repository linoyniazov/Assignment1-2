import express from "express";
const router = express.Router();
import commentController from "../controllers/comment";
import { authMiddleware } from "../controllers/auth";

router.post(
  "/",
  authMiddleware,
  commentController.create.bind(commentController)
);

router.get("/getcomments", commentController.getAll.bind(commentController));

router.get("/:id", commentController.getById.bind(commentController));

router.put("/:id", commentController.update.bind(commentController));

router.delete(
  "/:id",
  authMiddleware,
  commentController.deleteItem.bind(commentController)
);

export default router;
