const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check if token exists in Headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: 'Not authorized to access this route',
        });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the user from the token ID and attach it to the 'req' object
    // This makes the user's data available in every protected controller!
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: 'No user found with this id' });
    }

    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: 'Not authorized to access this route' });
  }
};

module.exports = { protect };
