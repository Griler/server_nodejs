const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    productPictures: [
        {type: String}
    ],
    reviews: [
        {
            rating: {type: Number, required: true},
            comment: {type: String, required: true},
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User',
            },
            createdAt: {type: Date, default: Date.now}
        },
    ],
    variants: {
        type: String,
        required: true,
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    isDisabled: false
}, {timestamps: true});


module.exports = mongoose.model('Product', productSchema);