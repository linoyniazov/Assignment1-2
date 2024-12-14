const express = require('express');
const router = express.Router();
const {
    createComment,
    getComments,


} = require('../controllers/comment');

router.post('/', createComment);
router.get('/:postId?', getComments);



module.exports = router;
