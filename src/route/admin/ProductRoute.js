const express = require('express');
const route = express.Router();
const {Upload} = require('../../app/middleware')
const {StoragePath, MimeType} = require('../../app/constant')

const ProductController = require('../../app/controller/admin/ProductController');
route.get('/:id/detail', ProductController.detail)
route.get('/:id/edit', ProductController.edit) 

route.post('/:id/update',
    Upload(
        StoragePath.AVATAR_STORAGE_PATH,
        [MimeType.PNG, MimeType.JPG, MimeType.JPEG]
    ).single('avatar'),
ProductController.update)

route.get('/create', ProductController.create)
route.post(
    '/store',
Upload(
    StoragePath.AVATAR_STORAGE_PATH,
    [MimeType.PNG, MimeType.JPG, MimeType.JPEG]
).single('avatar'),
ProductController.store)

route.delete('/delete', ProductController.delete)
route.use('/', ProductController.home)
module.exports = route