import crypto from "crypto";

// Salt for IP hashing to respect privacy laws (UU PDP)
const SALT = process.env.IP_HASH_SALT || "kala-atelier-architectural-salt-2026";

export function hashIp(ip: string): string {
  return crypto.createHmac("sha256", SALT).update(ip).digest("hex");
}

// In-memory rate limiter for serverless environment
// Maps hashed IP to array of request timestamps (in milliseconds)
const rateLimitMap = new Map<string, number[]>();

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

const WINDOW_MS = 60 * 60 * 1000; // 1 hour window
const MAX_REQUESTS = 3; // Max 3 enquiry submissions per IP per hour

export function checkRateLimit(ipHash: string): RateLimitResult {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const timestamps = (rateLimitMap.get(ipHash) || []).filter(
    (time) => time > windowStart
  );

  if (timestamps.length >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  timestamps.push(now);
  rateLimitMap.set(ipHash, timestamps);

  // Periodic garbage collection for memory hygiene
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      const validTimes = times.filter((t) => t > windowStart);
      if (validTimes.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, validTimes);
      }
    }
  }

  return {
    allowed: true,
    remaining: MAX_REQUESTS - timestamps.length,
  };
}

