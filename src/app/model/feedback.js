const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
        name_story: { type: String, max: 60, min: 6},
        alias_story: { type: String},
        view: { type: Number},
        status: { type: String},
        description: { type: String},
        image: { type: String}
    },
    {timestamps: true,});
module.exports = FeedbackSchema