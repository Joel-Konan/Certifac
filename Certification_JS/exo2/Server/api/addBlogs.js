const blogsModel = require('../models/blog')

exports.addBlog = (req, res, next) => {
    let blog = createBlog(req);
    console.log(blog)

    blog
        .save()
        .then(data => {
            console.log("Data :",data)
            res.status(200).json({
                message: 'Blog crée avec Succès!',
                blog: {
                    title : data.title,
                    desc : data.desc,
                    image : data.image
                }
            });
        })
        .catch(error => {
            console.log(error)
            next(error);
        });
};

exports.getAllBlog = async (req, res) => {
    let blogs = await blogsModel.find()

    if (blogs.length > 0) {
        res.json({ success: true, result: blogs })
    } else {
        res.json({ success: false })
    }
}

function createBlog(req) {
    console.log(req.body)
    return new blogsModel({
        title : req.body.title,
        desc : req.body.desc,
        image : req.file.path,
        comments : req.body.comments,
        categories: req.body.categories
    });
}