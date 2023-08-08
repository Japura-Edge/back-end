const express = require('express')
const router = express.Router()
const Category = require('../models/category.model')

//To get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})

//to get sub categories of category_group
router.get('/:categoryGroup', async (req, res) => {
    try {
        const {  categoryGroup } = req.params
        const respond = await Category.findOne({  categoryGroup: categoryGroup }, 'subCategory -_id')
        res.json(respond)
    } catch (err) {
        res.status(404).json({ messsage: 'not found', error: err})
    }
})

//To create a new catetgory group
router.post('/add', async (req, res) => {
    try {
        const { categoryGroup, subCategory, description } = req.body

        const newcategory = new Category({
            categoryGroup: categoryGroup,
            subCategory: subCategory,
            description: description
        })

        await newcategory.save()
        res.status(200).json({ connection: 'succesful', message: 'category added'})
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})

module.exports = router