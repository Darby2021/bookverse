const express = require('express');
const route = express.Router();

const ChapterRoute = require('../../app/controller/admin/ChapterController');

route.get('/:id/edit', ChapterRoute.edit);
route.post('/:id/update', ChapterRoute.update);
route.get('/:id/create', ChapterRoute.create);
route.post('/:id/store', ChapterRoute.store);
route.delete('/delete', ChapterRoute.delete);
// route.use('/', ChapterRoute.home);

module.exports = route