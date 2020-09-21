const mongoose = require('../config/connect.bd')
let Schema = mongoose.Schema

let comments = new Schema({
    id_blog : {
        type: Schema.Types.ObjectId,
        ref: "blogs"
    },
    text : String,
    date : {
        type : Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('comments', comments)