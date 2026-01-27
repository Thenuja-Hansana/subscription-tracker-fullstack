const express = require('express');
const userRouter = require('./routes/user.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const authRouter = require('./routes/auth.routes');
const errorMiddleware = require('./middlewares/error.middleware');

// Initialize the Express application
const app = express();

// Middleware to parse incoming JSON data from requests
app.use(express.json());
app.use(express.static('public'));
// Tell the express to use the userRouter for any request that starts with api/v1/users
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

// Export the app so server.js can use it
module.exports = app;
