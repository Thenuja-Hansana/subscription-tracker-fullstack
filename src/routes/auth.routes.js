const express = require('express');
const { signUp, signIn } = require('../controllers/auth.controller');
const arcjetMiddleware = require('../middlewares/arcjet.middleware');

const authRouter = express.Router();

// Apply Arcjet security to authentication routes
authRouter.use(arcjetMiddleware);

// Route: /api/v1/auth/sign-up
authRouter.post('/sign-up', signUp);

// Route: /api/v1/auth/sign-in
authRouter.post('/sign-in', signIn);

module.exports = authRouter;
