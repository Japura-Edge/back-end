const express = require('express')
const router = express.Router()
const Product = require('../models/product.model')
const User = require('../models/user.model')

//To get all products
router.get('/', async (req, res) => {
    try {
        const product = await Product.find()
        res.json(product)
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})

//To retrive first 20 matching results for a requested keyword

let searchCurrentPage = 1
let searchCurrentKey = '';

router.post('/search', async (req, res) => {
    try {
        const { key, page, lower, upper } = req.body
        const itemsPerPage = 12

        if (searchCurrentKey !== key) {
            searchCurrentPage = 1
            searchCurrentKey = key
        }

        if (page === 'next') {
            searchCurrentPage++
        } else if (page === 'prev') {
            searchCurrentPage = Math.max(1, searchCurrentPage - 1)
        } else if (typeof page === 'number') {
            searchCurrentPage = Math.max(1, page)
        }

        // Handle undefined lower and upper
        const lowerBound = typeof lower === 'number' ? lower : 0;
        const upperBound = typeof upper === 'number' ? upper : Infinity;

        // Count of matching documents
        const count = await Product.countDocuments({
            keywords: { $regex: new RegExp(key, 'i') },
            price: { $gte: lowerBound, $lte: upperBound }
        });

        const result = await Product.find({ 
            keywords: { $regex: new RegExp(key, 'i') }, 
            price: { $gte: lowerBound, $lte: upperBound } 
        }).skip((searchCurrentPage - 1) * itemsPerPage).limit(itemsPerPage)

        res.json({ count: count, result: result});
    } catch (err) {
        res.status(404).json({ message: 'not found', error: err })
    }
});

//to list products according to accending oder of price and price ranges

let productsCurrentPage = 1 
let productsSortOrder = 'asc' 

router.post('/sort', async (req, res) => {
    try {
        const { page, sortOrder, lower, upper } = req.body
        const itemsPerPage = 12

        if (sortOrder === 'asc' || sortOrder === 'desc') {
            // Reset page number when the sort order changes
            if (productsSortOrder !== sortOrder) {
                productsSortOrder = sortOrder
                productsCurrentPage = 1
            }
        }

        if (page === 'next') {
            productsCurrentPage++
        } else if (page === 'prev') {
            productsCurrentPage = Math.max(1, productsCurrentPage - 1)
        } else if (typeof page === 'number') {
            productsCurrentPage = Math.max(1, page)
        }

        // Handle undefined lower and upper
        const lowerBound = typeof lower === 'number' ? lower : 0;
        const upperBound = typeof upper === 'number' ? upper : Infinity;

        const sortDirection = productsSortOrder === 'asc' ? 1 : -1

        // Count of matching documents
        const count = await Product.countDocuments({ price: { $gte: lowerBound, $lte: upperBound } });

        const products = await Product.find({price: { $gte: lowerBound, $lte: upperBound }})
            .sort({ price: sortDirection }) // Sort by 'price' field
            .skip((productsCurrentPage - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json({ count: count, products: products })
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err })
    }
})


//To add a new product
router.post('/add', async (req, res) => {
    try {
        const {userName, productName, keywords, subCategory, price, status, gallery, description} = req.body

        const newproduct = new Product({
            userName: userName,
            productName: productName,
            keywords: keywords,
            subCategory: subCategory,
            price: parseFloat(price),
            status: status,
            gallery: gallery,
            favouriteCount: 0,
            description: description,
        })

        await newproduct.save()
        res.status(200).json({ connection: 'succesful', message: 'product added'})
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})

router.put('/favCount', async (req, res) => {
    try {
        const { id } = req.body
        const favCount = await Faculty.findOne({ _id: id }, "favouriteCount -_id")
        await Product.findOneAndUpdate({ _id: id }, { favouriteCount: favCount.favouriteCount+1 }, { new: true })
        res.json({ message: "update the count", error: err})
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})

module.exports = router