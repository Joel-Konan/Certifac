const blogsModel = require("../models/blog")
const express = require("express")
const Router = express.Router();

Router.get("/", async (req, res) => {
    let blog = await blogsModel.find()

    if (blog.length > 0) {
        res.json({ success: true, result: blog })
    } else {
        res.json({ success: false })
    }
})

Router.get("/deleteBlogs/:id", async (req, res, next) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        console.log(id)
        let blog = await blogsModel.find({ _id: req.params.id })
        console.log("blog ", blog);
        if (blog.length > 0) {
            blogsModel.deleteOne({ _id: id}).then((r) => {
                res.json({ success: true, ok:r.deletedCount })
            }).catch((er) => { res.status(403).send("Erreur " + er) })
        } else {
            res.status(403).send("blog non trouvé")
        }
    } else {
        res.status(403).send("id n'est pas Object")

    }
})


module.exports = Router;