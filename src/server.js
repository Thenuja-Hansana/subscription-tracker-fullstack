const dns = require('dns');

// forces the application to use Google's public DNS servers for resolution.
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;
const setupCron = require('./cron');

app.listen(PORT, async () => {
  console.log(`Server is running on port on : http://localhost:${PORT}`);

  await connectDB();

  // Start the automated reminder scheduler
  setupCron();
});
