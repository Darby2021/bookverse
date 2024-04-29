const express = require('express')
const route = express.Router()

const {ProFileController} = require('../app/controller')

route.get('/', ProFileController.ProfilePage)
route.put('/change-password', ProFileController.ChangePassword)

module.exports = route