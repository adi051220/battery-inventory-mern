const Battery = require('../models/Battery');

const getBatteries = async (req, res) => {
    try {
        const batteries = await Battery.find().sort({ createdAt: -1 }); 
        res.status(200).json(batteries);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getBatteryById = async (req, res) => {
    try {
        const battery = await Battery.findById(req.params.id);
        if (!battery) return res.status(404).json({ error: 'Not found' });
        res.status(200).json(battery);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const addBattery = async (req, res) => {
    try {
        const newBattery = new Battery(req.body);
        const savedBattery = await newBattery.save();
        res.status(201).json(savedBattery); 
    } catch (error) {
        res.status(400).json({ error: 'Failed to add battery' });
    }
};

const editBattery = async (req, res) => {
    try {
        const updatedBattery = await Battery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } 
        );
        if (!updatedBattery) return res.status(404).json({ error: 'Not found' });
        res.status(200).json(updatedBattery);
    } catch (error) {
        res.status(400).json({ error: 'Update failed' });
    }
};

const deleteBattery = async (req, res) => {
    try {
        const deletedBattery = await Battery.findByIdAndDelete(req.params.id);
        if (!deletedBattery) return res.status(404).json({ error: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getReport = async (req, res) => {
    try {
        const report = await Battery.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $sort: { count: -1 } } 
        ]);
        
        const formattedReport = report.map(r => ({ status: r._id, count: r.count }));
        res.status(200).json(formattedReport);
    } catch (error) {
        res.status(500).json({ error: 'Report generation failed' });
    }
};

module.exports = {
    getBatteries,
    getBatteryById,
    addBattery,
    editBattery,
    deleteBattery,
    getReport
};