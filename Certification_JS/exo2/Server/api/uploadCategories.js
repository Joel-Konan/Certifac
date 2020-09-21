const categoriesModel = require('../models/categories')

Router.get("/updateCategories/:id", async (req, res, next) => {

    try {
        let id_categories = await categoriesModel.findById(req.params.id)
       

       if(id_categories){
        let categoriesUpdate = id_categories.updateOne({_id:req.params.id},{...req.body})
        categoriesUpdate.save().then(r=>{
            res.json(r)
        })
       }
        
    } catch (error) {
        res.send('Update error :' + error)
    }
})