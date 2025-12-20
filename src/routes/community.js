const express = require('express');
const router = express.Router();

const createPostController = require('../controllers/posts/createPost');
const createCommentController = require('../controllers/posts/createComment');
const likePostController = require('../controllers/posts/likePost');
const plantTreeController = require('../controllers/posts/plantTree');
const donateController = require('../controllers/donations/donate');
const getAwarenessPosts = require('../controllers/posts/getAwarenessPosts');
const getCauses = require('../controllers/donations/getCauses');
const getImpactProfile = require('../controllers/user/getImpactProfile');
const getCommentsController = require('../controllers/posts/getComments');

const checkUser = require('../checkUser');
const { upload } = require('../utils/s3Config');

router.post('/posts', checkUser, upload.single('media'), createPostController);
router.get('/posts', getAwarenessPosts);
router.post('/comments', checkUser, createCommentController);
router.get('/comments/:postId', getCommentsController);
router.post('/plant-tree', checkUser, plantTreeController);
router.post('/donate', checkUser, donateController);
router.get('/causes', getCauses);
router.get('/profile/:userId', getImpactProfile);

module.exports = router;

// POST /community/posts