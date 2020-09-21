const mongoose = require('mongoose')

mongoose.connect(
    'mongodb+srv://joel:12345@cluster0.sye3l.mongodb.net/certification_JS?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

mongoose.connection.on('open', () => {
    try {
        console.log('Database connected !')
    } catch (error) {
        console.log('Error : ', error)
    }
})

module.exports = mongoose