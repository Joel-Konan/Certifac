let express = require('express');
let router = express.Router();
let addCategorieController = require('../api/addCategories')
let axios = require('axios')

/* GET home page. */

router.get('/categories', addCategorieController.getAllCategorie)
router.post("/addCategories", addCategorieController.addCategorie);
router.post("/updateCategories/:id", addCategorieController.updateCategorie);




module.exports = router;
