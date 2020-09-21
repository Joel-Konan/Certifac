let CategorieModel = require('../models/categories');

exports.getAllCategorie = async (req, res) => {
    let categories = await CategorieModel.find()

    if (categories.length > 0) {
        res.json({ success: true, result: categories })
    } else {
        res.json({ success: false })
    }
}

exports.addCategorie = (req, res, next) => {
    let categorie = createCategorie(req);
    
    categorie
        .save()
        .then(data => {
            console.log(data);
            res.status(200).json({
                message: 'Catégorie crée avec Succès!',
                categorie: {
                    name : data.name
                }
            });
        })
        .catch(error => {
            console.log(error)
            next(error);
        });
};

exports.updateCategorie = async (req, res, next) => {

    try {
        let id_categorie = await CategorieModel.findById(req.params.id)

        console.log(req.body, id_categorie);

        if (id_categorie) {
            CategorieModel.updateOne({ _id: req.params.id }, {...req.body, image: req.file.path})
                .then(r => {
                    res.json(r)
                })
        }

    } catch (error) {
        res.send('Update error :' + error)
    }
}

function createCategorie (req) {
    console.log(req.body)
    return new CategorieModel({
        name : req.body.name
    });
}