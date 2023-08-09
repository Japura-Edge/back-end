const mongoose = require('mongoose')

const schema = mongoose.Schema

const facultySchema = new schema({
    facultyName: {type: String, required: true},
    count: {type: Number, required: true},
}, {
    timestamps: true
})

const Faculty = mongoose.model('faculty', facultySchema)

module.exports = Faculty