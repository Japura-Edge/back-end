const express = require('express')
const router = express.Router()
const Faculty = require('../models/faculty.model')

//To get all faculty details
router.get('/', async (req, res) => {
    try {
        const faculties = await Faculty.find()
        res.json(faculties)
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})

//To create a new catetgory group
router.post('/add', async (req, res) => {
    try {
        const { facultyName, count } = req.body

        const newFaculty = new Faculty({
            facultyName: facultyName,
            count: parseInt(count)
        })

        await newFaculty.save()
        res.status(200).json({ connection: 'succesful', message: 'faculty added'})
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})

module.exports = router