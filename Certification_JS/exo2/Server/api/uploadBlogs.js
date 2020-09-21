const blogsModel = require('../models/blog')

Router.get("/updateBlogs/:id", async (req, res, next) => {

    try {
        let id_blogs = await blogsModel.findById(req.params.id)
       

       if(id_blogs){
        let blogsUpdate = id_blogs.updateOne({_id:req.params.id},{...req.body})
        blogsUpdate.save().then(r=>{
            res.json(r)
        })
       }
        
    } catch (error) {
        res.send('Update error :' + error)
    }
})