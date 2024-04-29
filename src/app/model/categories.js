const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
        name_category: { type: String, require: true},
        description_category: { type: String, require: true}
        },
    {
        timestamps: true,
    });
module.exports = CategorySchema