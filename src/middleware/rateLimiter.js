import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  message: {message: "Too many requests from this IP. Please try again later."},

  standardHeaders: true,
  legacyHeaders: false,
});