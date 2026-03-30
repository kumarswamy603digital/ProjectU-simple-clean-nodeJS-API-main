import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import compression from "compression";

import mainRoutes from './main.routes.js';
import userRoutes from './user.routes.js';

const app = express();
const port = process.env.PORT || 4000;

// Trust proxy (important for Render / cloud platforms)
app.set('trust proxy', 1);

// Rate limiter
const rateLimiter = rateLimit({
windowMs: 60 * 1000,
max: 100,
message: {
status: 429,
message: "Too many requests, please try again later."
}
});

// Middlewares
app.use(compression());
app.use(express.json());
app.use(helmet());

// CORS
app.use(cors({
origin: process.env.FRONTEND_URL || "*",
credentials: true
}));

// Health check route (important for deployment platforms)
app.get('/', (req, res) => {
res.status(200).send('API is running 🚀');
});

// Apply rate limiter only to API routes
app.use('/v1', rateLimiter);

// Routes
app.use('/v1', mainRoutes);
app.use('/v1/user', userRoutes);

// 404 handler
app.use((req, res) => {
res.status(404).json({
message: "Route not found"
});
});

// Global error handler
app.use((err, req, res, next) => {
console.error("Error:", err.message);
res.status(500).json({
message: "Internal Server Error"
});
});

// Start server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
