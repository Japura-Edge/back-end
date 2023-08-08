const mongoose = require('mongoose')

const schema = mongoose.Schema

const categorySchema = new schema({
    categoryGroup: {type: String, required: true},
    subCategory: {type: [String], required: true},
    description: {type: String, required: true},
}, {
    timestamps: true
})

const Category = mongoose.model('category', categorySchema)

module.exports = Category