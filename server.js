const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
var cors = require('cors')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const facultyRoutes = require('./routes/faculty')

const app = express()
const uri = `mongodb+srv://MevanWeerasinghe:459726MYmongo@cluster1.mxcc132.mongodb.net/japura-edge?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)
app.use('/faculty', facultyRoutes)

const _connection = mongoose.connection

_connection.once('open', () => {
    console.log('Mongo db connection is established')
})

app.listen(8080, () => {
    console.log('Sever is listning on port 8080......')
})