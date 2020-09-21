const mongoose = require('../config/connect.bd')
let mySchema = mongoose.Schema

let categories = new mySchema({
    name: String
})

module.exports = mongoose.model('categories', categories)