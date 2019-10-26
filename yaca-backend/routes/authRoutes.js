const express = require('express');
// We need to get the express router
const router = express.Router(); //We can to export the router

//we need to create a require file for auth.js
const AuthCtrl = require('../controllers/auth');

//For autentification we need...
router.post('/register', AuthCtrl.CreateUser);
router.post('/login', AuthCtrl.LoginUser);

module.exports = router;