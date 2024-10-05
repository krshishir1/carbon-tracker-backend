const express = require('express');
const router = express.Router();

const createPostController = require('../controllers/posts/createPost');
const createCommentController = require('../controllers/posts/createComment');
const likePostController = require('../controllers/posts/likePost');

const checkUser = require('../checkUser');

router.post('/posts', checkUser, createPostController);
router.post('/comments', checkUser, createCommentController);
router.post('/like', checkUser, likePostController);

module.exports = router;

// POST /community/posts