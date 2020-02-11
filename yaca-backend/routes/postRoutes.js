const express = require('express');
// We need to get the express router
const router = express.Router(); //We can to export the router

//we need to create a require file for auth.js
const PostCtrl = require('../controllers/posts');
const AuthHelper = require('../Helpers/AuthHelper');

//For autentification we need...
router.post('/post/add-post', PostCtrl.AddPost);

module.exports = router;