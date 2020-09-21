const categoriesModel = require("../models/categories")
const express = require("express")
const Router = express.Router();

Router.get("/deleteCat/:id", async (req, res, next) => {
    let id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        console.log(id)
        let categories = await categoriesModel.find({ _id: req.params.id })
        console.log("categories ", categories);
        if (categories.length > 0) {
            categories.deleteOne({ _id: categories._id }).then((r) => {
                res.json({ success: true, result: { categories: comment._id } })
            }).catch((er) => { res.status(403).send("Erreur " + er) })
        } else {
            res.status(403).send("blog non trouvé")
        }
    } else {
        res.status(403).send("id n'est pas Object")

    }
})


module.exports = Router;