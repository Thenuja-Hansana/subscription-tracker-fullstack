const Subscription = require('../models/subscription.model');
const sendEmail = async (subscription) => {
  try {
    const { name, price, currency, user } = subscription;

    if (!user || !user.email) return;

    const subject = `🔔 Renewal Reminder: ${name}`;
    const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-top: 4px solid #3b82f6; padding: 20px;">
                <h2 style="color: #3b82f6;">Subscription Renewal Soon!</h2>
                <p>Hello <strong>${user.name}</strong>,</p>
                <p>This is a friendly reminder that your subscription for <strong>${name}</strong> is renewing in <strong>3 days</strong>.</p>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Amount:</strong> ${price} ${currency}</p>
                    <p style="margin: 5px 0;"><strong>Renewal Date:</strong> ${new Date(subscription.renewalDate).toDateString()}</p>
                </div>
                <p>Please ensure you have sufficient funds or manage your subscription if you wish to make changes.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <small style="color: #6b7280;">This is an automated message from your Subscription Tracker Dashboard.</small>
            </div>
        `;

    const sendMail = require('./send-email');
    await sendMail({
      email: user.email,
      subject,
      html,
    });

    console.log(`Email sent successfully to ${user.email} for ${name}`);
  } catch (error) {
    console.error(
      `Error sending email for ${subscription.name}: ${error.message}`,
    );
  }
};

const checkReminders = async () => {
  try {
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);

    // Reset hours for clean comparison
    threeDaysFromNow.setHours(0, 0, 0, 0);

    // Find subscriptions renewing in exactly 3 days
    // We populate the 'user' field so we have their email address!
    const subscriptions = await Subscription.find({
      renewalDate: {
        $gte: threeDaysFromNow,
        $lt: new Date(threeDaysFromNow.getTime() + 24 * 60 * 60 * 1000),
      },
    }).populate('user', 'name email');

    console.log(
      `Found ${subscriptions.length} subscriptions renewing in 3 days.`,
    );

    for (const sub of subscriptions) {
      await sendEmail(sub);
    }
  } catch (error) {
    console.error('Error in checkReminders task:', error);
  }
};

module.exports = { checkReminders };
