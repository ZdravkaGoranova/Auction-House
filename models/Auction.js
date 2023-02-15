const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [4, 'Title should be at least two characters!'],
        required: true,

    },
    description: {
        type: String,
        maxLength: 200,
    },

    category: {
        type: String,
        enum: {
            values: ['Vehicles', 'Real Estate', 'Electronics', 'Furniture', 'Other'],
            message: 'Invalid category',
        },
        required: true,

    },
    image: {
        type: String,
        // match: [/^http[s]?:\/\//, 'Invalid URL'],

    },

    price: {
        type: Number,
        min: 1,
        required: true,

    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,

    },

    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    // owner: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    // },
    // wishingList: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    // }],

    //или
    // buyers: {
    //     type: [mongoose.Types.ObjectId],
    //     default: [],
    //     ref: 'User'
    // },

});


const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;