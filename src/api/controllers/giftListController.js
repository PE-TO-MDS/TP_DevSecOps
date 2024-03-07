const giftModel = require('../models/giftListModel');

const giftController = {
    getAllGifts: async (req, res) => {
        const gifts = await giftModel.getAllGifts();
        res.json(gifts);
    },
    addGift: async (req, res) => {
        const result = await giftModel.addGift(req.body);
        res.status(201).json(result);
    },
    updateGift: async (req, res) => {
        const result = await giftModel.updateGift(req.params.id, req.body);
        res.status(200).json(result);
    },
    deleteGift: async (req, res) => {
        const result = await giftModel.deleteGift(req.params.id);
        res.status(200).json(result);
    }
};

module.exports = giftController;
