const mongoose = require('mongoose');

// Battery Schema
const batterySchema = new mongoose.Schema({
    battery_type: { 
        type: String, 
        required: [true, 'Battery type is required'],
        trim: true 
    },
    status: { 
        type: String, 
        required: [true, 'Battery status is required'],
        enum: ['Available', 'In-Use', 'Charged', 'Under Maintenance']
    }
}, { timestamps: true }); 

const Battery = mongoose.model('Battery', batterySchema);

module.exports = Battery;