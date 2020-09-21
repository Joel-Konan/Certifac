const commentModel = require('../models/comments')

Router.get("/updateComment/:id", async (req, res, next) => {

    try {
        let id_comment = await commentModel.findById(req.params.id)
       

       if(id_comment){
        let commentUpdate = id_comment.updateOne({_id:req.params.id},{...req.body})
        commentUpdate.save().then(r=>{
            res.json(r)
        })
       }
        
    } catch (error) {
        res.send('Update error :' + error)
    }
})