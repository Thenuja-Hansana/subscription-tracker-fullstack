// This file will be implemented by the USER under guidance.
const Subscription = require('../models/subscription.model');

const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: 'Subscription not found' });
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

const createSubscription = async (req, res, next) => {
  try {
    const { startDate, frequency } = req.body;
    const renewalDate = new Date(startDate);

    if (frequency === 'monthly') {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    } else if (frequency === 'yearly') {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    }

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id, // Always tie to the authenticated user
      renewalDate,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    // Ensure user owns the subscription before updating
    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: 'Subscription not found' });
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: 'Subscription not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Subscription deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
