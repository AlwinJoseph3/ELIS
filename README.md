# ELIS — Explain Like I'm Stuck

> *The AI tutor that finds your logic gap — not just your bug.*

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)

---

## What is ELIS?

Most AI tools hand you the answer. ELIS doesn't.

ELIS is a Socratic debugging assistant — it asks you the right questions until *you* figure out what's wrong. The conversation doesn't end until you've identified the root cause yourself. This forces genuine understanding instead of copy-paste fixes.

Built for developers who want to actually learn, not just ship.

---

## How It Works

1. You paste your buggy code and describe what's going wrong
2. ELIS analyses the logical structure — not just syntax
3. It asks targeted questions that narrow down where your thinking broke
4. You identify the root cause yourself
5. Only then does the session close

---

## Features

- 🧠 **Socratic dialogue engine** — constrained system prompts ensure ELIS never gives direct answers
- 🔁 **Multi-turn conversations** — full context retained across the entire debugging session
- 🔒 **Secure API proxy** — a Node.js/Express backend keeps the Gemini API key server-side and rate-limits requests
- 💾 **Persistent chat history** — sessions saved in-browser so you can pick up where you left off
- 📡 **API status indicator** — live Gemini API connection feedback
- 🔄 **Chat reset** — cleanly wipe session and start fresh
- ⚡ **React + TailwindCSS UI** — fast, responsive, minimal

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, TailwindCSS, Vite |
| Backend | Node.js, Express |
| AI Integration | Gemini API (proxied server-side) |
| Context Management | Advanced system prompting, multi-turn memory |
| Storage | LocalStorage (client-side session persistence) |

---

## The Hard Part

Getting an LLM to *not* answer a question is harder than it sounds. The system prompt architecture uses layered constraints and context modelling to keep ELIS from slipping into answer mode — even when the user directly asks for the solution.

---

## Getting Started
 
ELIS has two parts that run together: a React frontend and a small Express backend that proxies requests to Gemini so the API key never reaches the browser.
 
```bash
git clone https://github.com/AlwinJoseph3/ELIS.git
cd ELIS
```
 
**1. Set up the backend**
 
```bash
cd server
npm install
cp .env.example .env
```
 
Add your Gemini API key to `server/.env`:
 
```
GEMINI_API_KEY=your_key_here
PORT=3001
```
 
Start it:
 
```bash
node server.js
```
 
**2. Set up the frontend**
 
In a separate terminal, from the project root:
 
```bash
npm install
cp .env.example .env
```
 
The default `.env` value already points at the local backend:
 
```
VITE_API_URL=http://localhost:3001
```
 
Start it:
 
```bash
npm run dev
```
 
With both running, open the app in your browser — it'll route chat requests through the local backend automatically.
 
---

## Built By

**Alwin Joseph** — [Portfolio](https://alwinjoseph.netlify.app/) · [LinkedIn](https://www.linkedin.com/in/alwin-joseph-807420221/) · [GitHub](https://github.com/AlwinJoseph3)
