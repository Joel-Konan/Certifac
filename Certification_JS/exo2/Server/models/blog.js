const mongoose = require('../config/connect.bd')

let Schema = mongoose.Schema

let blog = new Schema({
    title : String,
    desc : String,
    image : String,
    date : {
        type : Date,
        default: Date.now()
    },
    comments : [{
            type: mongoose.Schema.Types.ObjectId,   
            ref : "comments"
    }],
    categorie: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    }]

})

module.exports = mongoose.model('blogs', blog)