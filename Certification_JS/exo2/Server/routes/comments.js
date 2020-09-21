let express = require('express');
let router = express.Router();
let addCommentController = require('../api/addcomment');

/* GET home page. */
router.get('/comments', function (req, res, next) {
res.render('index', { title: 'Express' });
});

router.post('/addComments', addCommentController.addComment);

module.exports = router;
