import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import compression from "compression";

import mainRoutes from './main.routes';
import userRoutes from './user.routes';

const app = express();
const port = process.env.PORT || 4000;

// Rate limiter
const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
});

// Middleware
app.use(compression());
app.use(express.json());
app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true
}));

// Apply limiter only to API
app.use('/v1', rateLimiter);

// Routes
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

app.use('/v1', mainRoutes);
app.use('/v1/user', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!"
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});