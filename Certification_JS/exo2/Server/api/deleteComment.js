const commentModel = require("../models/comments")
const express = require("express")
const Router = express.Router();

Router.get("/deleteComments/:id", async (req, res, next) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        console.log(id)
        let comment = await commentModel.find({ _id: req.params.id })
        console.log("comment ", comment);
        if (comment.length > 0) {
            comment.deleteOne({ _id: comment._id }).then((r) => {
                res.json({ success: true, result: { comment: comment._id } })
            }).catch((er) => { res.status(403).send("Erreur " + er) })
        } else {
            res.status(403).send("blog non trouvé")
        }
    } else {
        res.status(403).send("id n'est pas Object")

    }
})


module.exports = Router;