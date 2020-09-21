let CommentModel = require('../models/comments');
let blogsModel = require("../models/blog")


exports.addComment = (req, res, next) => {
    let blog = req.body.id_blog;
    let comment = createComment(req);

    comment
        .save()
        .then(async data => {
            let result = await blogsModel.findOne({_id:blog}).select("comments");
            if(result){
                result.comments.push(data._id);

                blogsModel.updateOne({_id:blog},{comments:result.comments}).then((r)=>{
                    res.status(200).json({
                        message: 'Commentaire ajoutée avec Succès!',
                        comment: {
                            text : data.text
                        }
                    });
                })
            }else{
                res.status(500).send({status:false})
            }

           
        })
        .catch(error => {
            next(error);
        });
};

exports.deleteComment = async (req, res, next) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        
        let comment = await CommentModel.findOne({ _id: req.params.id })
     
        if (comment) {
            CommentModel.deleteOne({ _id: comment._id }).then(async (rs) => {
                let rslt = await blogsModel.findOne({_id:comment.id_blog}).select("comments")
              
                let comments = rslt.comments.filter(id_c=>""+id_c != ""+comment._id)
          
                blogsModel.updateOne({_id:comment.id_blog},{comments:comments}).then(r=>{
                  
                    res.json({ success: true, result: rs.deletedCount })
                })
                
            }).catch((er) => { res.status(403).send("Erreur " + er) })
        } else {
            res.status(403).send("commentaire non trouvé")
        }
    } else {
        res.status(403).send("id n'est pas Object")

    }
}

function createComment(req) {
    return new CommentModel({
        ...req.body
    });
}