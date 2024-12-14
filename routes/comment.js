const express = require('express');
const router = express.Router();
const {
    createComment,
    getComments,
    updateComment,
    deleteComment,


} = require('../controllers/comment');

router.post('/', createComment);
router.get('/:postId?', getComments);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);



module.exports = router;
