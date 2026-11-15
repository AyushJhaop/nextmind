import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "nextmind_admin_session";

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "nm_super_secret_session_signing_key_2026_production"
  );
}

export function getExpectedAdminCredentials() {
  return {
    email: (process.env.ADMIN_EMAIL || "admin@nextmind.edu").toLowerCase().trim(),
    accessCode: process.env.ADMIN_ACCESS_CODE || "NEXTMIND-ADMIN-2026",
  };
}

export function createAdminToken(email) {
  const payload = JSON.stringify({
    email: email.toLowerCase().trim(),
    role: "ADMIN",
    exp: Date.now() + 1000 * 60 * 60 * 12, // 12 hours
  });
  const base64Payload = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(base64Payload)
    .digest("base64url");
  return `${base64Payload}.${signature}`;
}

export function verifyAdminToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }
  const [base64Payload, signature] = token.split(".");
  if (!base64Payload || !signature) return null;

  const expectedSig = crypto
    .createHmac("sha256", getSecret())
    .update(base64Payload)
    .digest("base64url");

  if (signature !== expectedSig) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(base64Payload, "base64url").toString("utf8")
    );
    if (!decoded || decoded.role !== "ADMIN" || decoded.exp < Date.now()) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

export { COOKIE_NAME };

