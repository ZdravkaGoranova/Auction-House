
const router = require('express').Router();

const Auction = require('../models/Auction.js');
const AuctionServices = require('../services/authServices.js');
const AuctionUtils = require('../utils/AuctionUtils.js');
const { getErrorMessage } = require('../utils/errorUtils.js')
const { isAuth, authentication } = require('../middlewares/authMddleware.js');



exports.getCreateCrypto = (req, res) => {//router.get('/'create',isAuth,(req, res))=>{
    console.log(req.user);

    res.render('аuction/create');
};
exports.postCreateCrypto = async (req, res) => {
    // console.log(req.body);//Object на данните от url
    console.log(req.user);

    try {
        const { title, category, image, price, description } = req.body;

        let auction = new Auction({
            title,
            category,
            image,
            price,
            description,
            owner: req.user._id,
        });
        console.log(auction);
        await auction.save();//запазва в db

        //или 
        //await cryptoService.create(req.user._id, { name, image, price, description, paymentMethod })

    } catch (error) {
        console.log(error.message);
        //return res.render('auth/404');
        return res.status(400).render('auction/create', { error: getErrorMessage(error) })
    }
    res.redirect('/catalog');
};

exports.getDetails = async (req, res) => {//router.get('/:cryptoId/details',(req,res)=>{)

    const auction = await AuctionServices.getOne(req.params.auctionId);
    //console.log(crypto)

    const isOwner = AuctionUtils.isOwner(req.user, auction);//const isOwner = crypto.owner==req.user._id;
    // console.log(isOwner)

    const isWished = Auction.wishingList?.some(id => id == req.user?._id);
    //console.log(isWished)
    //crypto.paymentMethod = paymentMethodsMap[crypto.paymentMethod]

    if (!auction) {
        return res.render('home/404');
    }

    // console.log(req.user._id);
    // console.log(req.params);
    // console.log(req.params.cryptoId);
    // console.log(`=========================================`)
    // console.log(crypto.owner.toString())

    res.render('Auction/details', { Auction, isOwner, isWished });
};

exports.getEditCrypto = async (req, res) => {

    const auction = await AuctionServices.getOne(req.params.auctionId);
    //const paymentMethods = AuctionUtils.generatePaymentMethod(Auction.paymentMethod);

    if (!AuctionUtils.isOwner(req.user, auction)) {
        return res.render('home/404')// throw new Error('You are not an owner!');
    }

    res.render('Auction/edit', { auction });
};

exports.postEditCrypto = async (req, res) => {

    const { title, category, image, price, description } = req.body

    try {
        await AuctionServices.update(req.params.AuctionId, {
            title,
            category,
            image,
            price,
            description
        })
    } catch (error) {
        // console.log(error.message);
        return res.status(400).render('Auction/edit', { error: getErrorMessage(error) })

    }
    res.redirect(`/аuctions/${req.params.auctionId}/details`);
};

exports.getDeleteCrypto = async (req, res) => {
    const auction = await AuctionServices.getOne(req.params.auctionId);

    const isOwner = AuctionUtils.isOwner(req.user, auction);
    console.log(isOwner)

    if (!isOwner) {
        return res.render('home/404');
    }

    await AuctionServices.delete(req.params.auctionId);//await cryptoService.delete(crypto);
    res.redirect('/catalog');
};

exports.getWish = async (req, res) => {//router.get('/:cryptoId/buy',isAuth)
    // const crypto = await cryptoService.getOne(req.params.cryptoId);
    // const isOwner = cryptoUtils.isOwner(req.user, crypto);
    try {
        await AuctionServices.wish(req.user._id, req.params.auctionId, req, res);
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }
    res.redirect(`/аuctions/${req.params.auctionId}/details`);
}


exports.getProfile = async (req, res) => {

    const userId = req.user._id;
    const user = req.user;
    let wished = await AuctionServices.getMyWishAuction(userId);
    console.log(userId)
    console.log(wished)
    res.render('аuction/profile', { user, wished });

}








//     try {
//         const userI = req.user._id;
//         const user = req.user;
//         let Auctions = await Auction.find().lean();
//         // const wishArray  = Auctions.wishingList?.filter(id => id == req.user?._id);

//        //const filteredArray = Auctions.filter(Auction => Auction.wishingList.includes(new ObjectId('req.user._id')));
//        const filteredArray = Auctions.filter(Auction => Auction.wishingList.includes('req.user._id'));

//         console.log(req.user._id)
//         console.log(filteredArray);

//         res.render('Auction/profile', { user, Auctions });
//     } catch (error) {

//         return res.status(400).render('home/404', { error: getErrorMessage(error) })
//     }
// }