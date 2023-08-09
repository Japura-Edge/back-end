const express = require('express')
const router = express.Router()
const Product = require('../models/product.model')

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

// let currentPage = 1;
// let currentKey = ''; 

// router.post('/search', async (req, res) => {
//     try {
//         const { key, page } = req.body;
//         const itemsPerPage = 3;

//         if (currentKey !== key) {
//             currentPage = 1;
//             currentKey = key;
//         }

//         if (page === 'next') {
//             currentPage++;
//         } else if (page === 'prev') {
//             currentPage = Math.max(1, currentPage - 1);
//         }

//         const items = await Product.find({ keywords: { $regex: new RegExp(key, 'i') } })
//             .skip((currentPage - 1) * itemsPerPage)
//             .limit(itemsPerPage);

//         res.json(items);
//     } catch (err) {
//         res.status(404).json({ message: 'not found', error: err });
//     }
// });


router.get('/search/:key', async (req, res) => {
    try {
        const { key } = req.params
        const respond = await Product.find({ keywords: { $regex: new RegExp(key, 'i') } }).limit(20)
        res.json(respond)
    } catch (err) {
        res.status(404).json({ message: 'not found', error: err})
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
            description: description,
        })

        await newproduct.save()
        res.status(200).json({ connection: 'succesful', message: 'product added'})
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})

module.exports = router