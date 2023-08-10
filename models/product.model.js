const mongoose = require('mongoose')

const schema = mongoose.Schema

const productSchema = new schema({
    userName: {type: String, required: true},
    productName: {type: String, required: true},
    keywords: {type: String, required: true},
    subCategory: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: String, required: true},
    gallery: {type: [String], required: true},
    favouriteCount: {type: Number, required: true},
    description: {type: String, required: true},
}, {
    timestamps: true
})

const Product = mongoose.model('product', productSchema)

module.exports = Product