const express = require('express');
const route = express.Router();

const ClientController = require('../../app/controller/client/ClientController');


route.get('/:id/follow/', ClientController.follow)
route.get('/:id/save', ClientController.SaveBook)
route.get('/:id/read', ClientController.ReadBook)
route.get('/:id/detail-product', ClientController.DetailProduct)
route.get('/about', ClientController.about)
route.get('/', ClientController.home)

module.exports = route