const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

// To get all user data
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})

//to retrieve individual user data using their username
router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params
        const respond = await User.findOne({ userName: username })
        res.json(respond)
    } catch (err) {
        res.status(404).json({ message: 'not found', error: err})
    }
})

//To retrieve the favorites of a user using their username.
router.get('/favourite/:username', async (req, res) => {
    try {
        const { username } = req.params
        const respond = await User.findOne({ userName: username }, 'favorites -_id')
        res.json(respond)
    } catch (err) {
        res.status(404).json({ message: 'not found', error: err})
    }
})

// To login
router.post('/login', async (req, res) => {
    try {
        // check if user exist
        const { userName, password } = req.body

        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // check password
        const passwordMatch = await bcrypt.compare(password, user.password)    
        if (!passwordMatch) {
            return res.status(404).json({ message: 'Incorrect password' })
        }

        res.json({ message: user })
    } catch (err) {
        res.status(404).json({ message: 'incorrect username or password', error: err})
    }
})

// To create a new user record.
router.post('/add', async (req, res) => {
    try {
        const {userName, firstName, profilePic, lastName, phoneNumber, email, password, favorites, seller, registrationNo, faculty} = req.body

        const user = await User.findOne({ userName })
        if (user) {
            return res.status(404).json({ message: 'Username already exist' })
        }

        const newUser = new User({
            userName: userName,
            profilePic: profilePic,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
            favorites: favorites,
            seller: seller,
            registrationNo: registrationNo,
            faculty: faculty
        })

        await newUser.save()
        res.status(200).json({ connection: 'succesful', message: 'seller added'})
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})

//To update a single user data
router.put('/:username', async (req, res) => {
    try {
        const { username } = req.params
        const newData = req.body

        const updatedUser = await User.findOneAndUpdate({ userName: username }, newData, { new: true })
        res.json({ connection: 'succesful', updatedData: updatedUser})
    } catch (err) {
        res.status(404).json({ message: 'failed', error: err})
    }
})  

module.exports = router