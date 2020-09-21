let express = require('express');
let router = express.Router();
let addBlogController = require('../api/addBlogs');
let upload = require('../config/multer')
let axios = require('axios')

/* GET home page. */
router.get('/blogs', addBlogController.getAllBlog);

router.post('/addBlogs', addBlogController.addBlog);

module.exports = router;