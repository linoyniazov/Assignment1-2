import express from "express";
const router = express.Router();
import commentController from "../controllers/comment";

router.post('/', commentController.create.bind(commentController));

router.get('/getcomments', commentController.getAll.bind(commentController));

router.get('/:id', commentController.getById.bind(commentController));

router.put('/:id', commentController.update.bind(commentController));

router.delete('/:id', commentController.deleteItem.bind(commentController));

export default router;
