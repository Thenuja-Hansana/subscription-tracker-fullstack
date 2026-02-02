const aj = require('../config/arcjet');

const arcjetMiddleware = async (req, res, next) => {
  try {
    // Fallback for IP if not detected (common in local dev)
    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

    const decision = await aj.protect(req, {
      requested: 1,
      ip: ip, // Explicitly pass the IP to avoid 'empty characteristic' errors
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ error: 'Too many requests. Please try again later.' });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: 'Bot detected. Access denied.' });
      }
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.error(`Arcjet error: ${error.message}`);
    next(); // In case of Arcjet error, we let the request through so the app doesn't break
  }
};

module.exports = arcjetMiddleware;
