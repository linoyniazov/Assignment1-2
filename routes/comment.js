const express = require('express');
const router = express.Router();
const {
    createComment,
    getComments,
    updateComment,


} = require('../controllers/comment');

router.post('/', createComment);
router.get('/:postId?', getComments);
router.put('/:id', updateComment);



module.exports = router;
