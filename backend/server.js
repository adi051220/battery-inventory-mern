const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectMongoDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const batteryRoutes = require('./routes/batteryRoutes');

dotenv.config();

connectMongoDB(process.env.MONGO_URI);

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/batteries', batteryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});