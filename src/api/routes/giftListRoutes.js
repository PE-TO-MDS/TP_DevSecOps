const express = require('express');
const giftController = require('../controllers/giftListController');
const router = express.Router();

router.get('/gifts', giftController.getAllGifts);
router.post('/gifts', giftController.addGift);
router.put('/gifts/:id', giftController.updateGift);
router.delete('/gifts/:id', giftController.deleteGift);

module.exports = router;
