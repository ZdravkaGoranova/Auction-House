const router = require('express').Router();

const Auction = require('../models/Auction.js');
const auctionServices = require('../services/authServices.js');

const auctionUtils = require('../utils/AuctionUtils.js');


router.get('/', (req, res) => {
    // console.log(req.user)
    res.render('home/index')
});


router.get('/catalog', async (req, res) => {//

    let auctions = await Auction.find().lean();
    // console.log(cryptos)
    // res.render('index', { cubes, search, difficultyFrom, diffficultyTo });
    res.render('product/catalog', { auctions });

});
router.get('/search', async (req, res) => {

    const { name, paymentMethod } = req.query;
    const auction = await auctionServices.search(name, paymentMethod);
    const paymentMethods = auctionUtils.generatePaymentMethod(paymentMethod);

    res.render('home/search', { auction, paymentMethods, name });

});

module.exports = router;