const express = require('express');
const postRouter = express.Router(); 
const { PostService } = require('../services');

const {AuthService} = require('../service');

router.get('/posts', AuthService.VerifyToken, PostService.GetAllPosts);
//For autentification we need...
router.post('/post/add-post', AuthService.VerifyToken, PostService.AddPost);

module.exports = postRouter;