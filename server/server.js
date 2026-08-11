// server.js
// This is the whole backend. One job: hold the Gemini API key safely,
// and forward chat requests to Google on the frontend's behalf.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3001;

// Lets the frontend (running on a different port/domain) talk to this server
app.use(cors());
// Lets us read JSON bodies sent from the frontend, e.g. { message: "..." }
app.use(express.json());

// The API key ONLY lives here, in the server's environment — never sent to the browser
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Rate limiter: blocks an IP after too many requests in a short window.
// This protects your Gemini quota/billing from being drained by bots or abuse.
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 15, // max 15 chat requests per IP per minute
  message: { error: "Too many requests. Please wait a moment and try again." },
});

// This is the ONE endpoint the frontend will call instead of talking to Gemini directly.
// It expects: { systemPrompt, history, message }
// It mirrors the exact chat structure your App.tsx already builds — same shape,
// just executed here on the server instead of in the browser.
app.post("/api/chat", chatLimiter, async (req, res) => {
  try {
    const { systemPrompt, history, message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: 'A "message" string is required.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        {
          role: "model",
          parts: [
            {
              text: "Understood. I am ELIS, ready to act as a Diagnostic Tutor. I will not give answers, but guide the user with Socratic questioning.",
            },
          ],
        },
        ...(Array.isArray(history) ? history : []),
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    res.json({ text });
  } catch (err) {
    console.error("Gemini error:", err);
    res
      .status(500)
      .json({ error: "Failed to get a response from the AI model." });
  }
});

// Simple endpoint to check the server is alive — useful when deploying
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`ELIS backend running on http://localhost:${PORT}`);
});
