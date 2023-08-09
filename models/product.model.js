const mongoose = require('mongoose')

const schema = mongoose.Schema

const productSchema = new schema({
    userName: {type: String, required: true},
    productName: {type: String, required: true},
    keywords: {type: String, required: true},
    subCategory: {type: String, required: true},
    price: {type: String, required: true},
    status: {type: String, required: false},
    gallery: {type: [String], required: false},
    description: {type: String, required: false},
}, {
    timestamps: true
})

const Product = mongoose.model('product', productSchema)

module.exports = Product