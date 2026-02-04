const cron = require('node-cron');
const { checkReminders } = require('./utils/check-reminders');

// Schedule a task to run every day at midnight (00:00)
// To test it quickly, you can use: '*/1 * * * *' (Every minute)
const setupCron = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily subscription renewal check...');
    await checkReminders();
  });

  console.log('Scheduled daily reminder job.');
};

module.exports = setupCron;
