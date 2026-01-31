const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// TEMP USER STORE (replace with DB later)
const users = [];

// 🔐 Generate JWT
const generateToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

/* ======================
   EMAIL / PASSWORD
====================== */

// Signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (users.find(u => u.email === email))
    return res.status(400).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    email,
    password: hashed,
    provider: "local",
  };

  users.push(user);
  res.json({ token: generateToken(user) });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  res.json({ token: generateToken(user) });
});

/* ======================
   GOOGLE OAUTH
====================== */

router.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    let user = users.find(u => u.email === email);

    if (!user) {
      user = {
        id: Date.now(),
        email,
        name,
        provider: "google",
      };
      users.push(user);
    }

    res.json({ token: generateToken(user) });
  } catch (err) {
    res.status(401).json({ error: "Google auth failed" });
  }
});

module.exports = router;
