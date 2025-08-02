const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/events',require('./routes/eventRoutes'));
app.use('/api/bookings',require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server is running in http://localhost:${PORT}/`));