import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 req/min per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, res) => {
    res.status(429).json({
      error: "Rate limit exceeded",
      message: "Too many requests from this IP, please try again later",
    });
  },
});
