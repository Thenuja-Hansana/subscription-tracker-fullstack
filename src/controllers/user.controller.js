const User = require('../models/user.model');

// ==========================================
// GET /api/v1/users
// ==========================================
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Mongoose method to get all users
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    // We pass the error to Express's next() function so it doesn't crash our app silently
    next(error);
  }
};

// ==========================================
// GET /api/v1/users/:id
// ==========================================
const getUser = async (req, res, next) => {
  try {
    // Find a user by the ID passed in the URL (req.params.id)
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// POST /api/v1/users/:id
// ==========================================
const createUser = async (req, res, next) => {
  try {
    // create a user by the ID passed in the url
    const user = await User.create(req.body);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not created' });
    }

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
