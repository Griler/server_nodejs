const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
        id:{
            type:String
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
        isDisabled: false
    },
    { timestamps: true }
);
module.exports = mongoose.model("Banner", imageSchema);