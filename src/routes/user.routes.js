const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
} = require('../controllers/user.controller');

// Create a new router object to handle user-related routes
const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);

// Export the router so we can use it in app.js
module.exports = userRouter;
