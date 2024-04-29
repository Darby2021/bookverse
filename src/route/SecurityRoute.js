const express = require('express')
const route = express.Router()

const {SecurityController} = require('../app/controller')

route.post('/sign-in', SecurityController.SignIn)

route.get('/', SecurityController.SignInPage)

module.exports = route