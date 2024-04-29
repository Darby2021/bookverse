const express = require('express')
const route = express.Router()

const AdminRoute = require('./AdminRoute')
const ProductRoute = require('./ProductRoute')
const AuthorRoute = require('./AuthorRoute')
const ChapterRoute = require('./ChapterRoute')
const CategoryRoute = require('./CategoryRoute')




route.use('/product', ProductRoute)
route.use('/category', CategoryRoute)
route.use('/author', AuthorRoute)
route.use('/chap', ChapterRoute)
route.use('/', AdminRoute)


module.exports = route