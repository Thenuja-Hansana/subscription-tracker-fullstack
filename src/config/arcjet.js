const arcjetModule = require('@arcjet/node');

// Since @arcjet/node is an ESM package, require() in Node 22/24 returns a namespace object.
// We need to access the default export for the main arcjet function.
const arcjet = arcjetModule.default;
const { shield, detectBot, tokenBucket } = arcjetModule;

// Initialize Arcjet with the rules for our application
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ['ip.src'], // Track requests by IP address
  rules: [
    // 1. Shield: Protects your app from common attacks (SQLi, XSS, etc.)
    shield({ mode: 'LIVE' }),

    // 2. Bot Protection: Blocks known bad bots
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE'], // Allow Google, Bing, etc.
    }),

    // 3. Rate Limiting: Prevent brute-force login attempts
    tokenBucket({
      mode: 'LIVE',
      refillRate: 5, // 5 tokens
      interval: 10, // every 10 seconds
      capacity: 10, // max 10 requests burst
    }),
  ],
});

module.exports = aj;
