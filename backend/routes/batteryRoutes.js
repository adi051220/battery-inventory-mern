const express = require('express');
const router = express.Router();
const { getBatteries, getBatteryById, addBattery, editBattery, deleteBattery, getReport } = require('../controllers/batteryController');
const { verifyToken } = require('../controllers/authController');

router.use(verifyToken); // protect all routes below

router.get('/', getBatteries);
router.get('/report', getReport);
router.get('/:id', getBatteryById);
router.post('/', addBattery);
router.put('/:id', editBattery);
router.delete('/:id', deleteBattery);

module.exports = router;