const express = require('express');
const {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} = require('../controllers/subscription.controller');
const { protect } = require('../middlewares/auth.middleware');

const subscriptionRoutes = express.Router();

// Apply the protect middleware to ALL routes below this line
subscriptionRoutes.use(protect);

const { checkReminders } = require('../utils/check-reminders');

subscriptionRoutes.get('/check-reminders', async (req, res, next) => {
  try {
    await checkReminders();
    res
      .status(200)
      .json({
        success: true,
        message: 'Reminder check triggered successfully',
      });
  } catch (error) {
    next(error);
  }
});

subscriptionRoutes.get('/', getSubscriptions);
subscriptionRoutes.get('/:id', getSubscriptionById);
subscriptionRoutes.post('/', createSubscription);
subscriptionRoutes.put('/:id', updateSubscription);
subscriptionRoutes.delete('/:id', deleteSubscription);

module.exports = subscriptionRoutes;
