import express from "express";
import { V4 } from "paseto";
import { generateKeyPair } from "crypto";
import dotenv from "dotenv";

dotenv.config();

/**
 * Generate an Ed25519 key pair (v4.public)
 */
console.log("🟡 Generating Ed25519 key pair (v4.public) ...");

const keyPair = await new Promise((resolve, reject) => {
  generateKeyPair(
    "ed25519",
    {
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    },
    (err, publicKey, privateKey) => {
      if (err) return reject(err);
      resolve({ publicKey, privateKey });
    }
  );
});

console.log("✅ Keys ready, starting Express...");

const { privateKey, publicKey } = keyPair;
const app = express();
app.use(express.json());

/**
 * Issue token (v4.public)
 */
app.post("/token", async (req, res) => {
  try {
    const payload = {
      userId: req.body.userId,
      role: req.body.role,
      issuedAt: new Date().toISOString(),
    };

    const token = await V4.sign(payload, privateKey, {
      issuer: "my-app",
      audience: "users",
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error("❌ Token generation failed:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Verify token (v4.public)
 */
app.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    const payload = await V4.verify(token, publicKey, {
      issuer: "my-app",
      audience: "users",
    });

    res.json({ valid: true, payload });
  } catch (err) {
    console.error("❌ Verification failed:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
