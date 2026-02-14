# 📘 ELIS: Documentation

**Project Name:** ELIS (Explain Like I'm Stuck)  
**Version:** 0.1.0-alpha  
**Date:** February 14, 2026

---

## 1. Introduction: The Philosophy

### What is ELIS?
ELIS is not just another AI coding assistant. Most AI tools (like ChatGPT or Copilot) are designed to give you *answers*. You paste code, ask "fix this," and it spits out the solution. While efficient, this often bypasses the learning process.

**ELIS is different.** It is built on the **Socratic Method**. Its goal is to act as a **Diagnostic Tutor**. When you are stuck, instead of giving you the code, ELIS asks probing questions to help *you* find the flaw in your logic. It bridges the gap between "I don't know why this isn't working" and "Aha! I missed that edge case."

### Why "Deep Space" Theme?
Coding often happens in deep focus states, often at night. I chose a **"Cyber-Minimalist"** aesthetic using deep Zinc (almost black) backgrounds and vibrant Neon Cyan accents. This reduces eye strain and keeps you immersed in the problem-solving zone.

---

## 2.  Tech Stack 

I built ELIS using a modern, lightweight, and zero-cost stack. Here is exactly what I used and why:

### 1. React 
*   **What it is:** A JavaScript library for building user interfaces.
*   **Why I used it:** It allows us to build reusable components (like the `ChatInterface` or `Sidebar`) and manage the state of the application (like the current chat history) efficiently.
*   **Vite:** I used Vite as the build tool. It makes starting the server instant and bundling the app for production incredibly fast.

### 2. TypeScript
*   **What it is:** JavaScript with "types".
*   **Why I used it:** It prevents bugs before they happen. For example, if I try to access `session.title` but a session doesn't exist, TypeScript warns me instantly. This was crucial for managing the complex `Session` data structures.

### **3. Tailwind CSS (The Stylist)**
*   **What it is:** A utility-first CSS framework.
*   **Why I used it:** Instead of writing separate `.css` files, I can write classes like `bg-zinc-950 text-cyan-400` directly in the HTML. This allowed me to strictly enforce the "Deep Space" theme and iterate on the design rapidly.

### 4. Google Gemini API 
*   **What it is:** A powerful Large Language Model (LLM) from Google.
*   **Why I used it:** 
    1.  **It's Intelligent:** Capable of understanding complex code context.
    2.  **It's Free (Tier):** Perfect for a zero-budget project.
    3.  **BYOK (Bring Your Own Key):** I designed the app so *your* key is stored in *your* browser. I don't run a backend server, which keeps the app private and secure.

### 5. LocalStorage 
*   **What it is:** A browser feature that lets websites save data on your computer.
*   **Why I used it:** To persist your chat sessions. If you refresh the page or close the browser, your "Diagnostic Session" is still there when you come back. No database required.

---

## 3. Architecture & Application Flow

### **A. File Structure**
The project is organized to separate concerns:
*   `src/components/layout`: Structural parts like `MainLayout` (Header) and `Sidebar`.
*   `src/components/features`: Core functionality like `ChatInterface` (the chat window) and `ProblemInput` (the code editor).
*   `src/components/ui`: Reusable UI elements like `Modal` (popups).
*   `src/hooks`: Custom logic hooks. `useSessions.ts` is the brain of the data management.
*   `src/lib`: Helper functions for Gemini API (`gemini.ts`) and the System Prompt (`prompts.ts`).

### **B. Data Flow**
1.  **Initialization**: When the app loads, `App.tsx` checks `localStorage`.
    *   If no API Key is found -> It opens the **Setup Access Modal**.
    *   If sessions exist -> It loads them into the **Sidebar**.
2.  **User Input**: You type in the `ProblemInput` (left) and your "Stuck Point" in `ChatInterface` (right).
3.  **The "Diagnose" Trigger**:
    *   I bundle your "Problem Code" + "Stuck Point" + "Chat History".
    *   I send this bundle to **Gemini**.
4.  **The AI Response**:
    *   Gemini (instructed by the **System Prompt**) analyzes the input.
    *   It replies with a *question* or *hint*, formatted in Markdown.
    *   If it solves the problem, it includes a hidden `[SOLVED]` tag.
5.  **State Update**:
    *   The app detects `[SOLVED]`.
    *   It triggers **Confetti** animation.
    *   It saves the new message to `localStorage`.

---

## 4. Key Features Deep Dive

### **1. Intelligent Session Management (`useSessions.ts`)**
*   **Auto-Titling**: I don't ask you to name chats. The app analyzes your first "Stuck Point" (e.g., "Loop isn't ending") and uses that as the session title. If that's missing, it grabs the first line of your code.
*   **Persistence**: Every keystroke in the Chat or Problem Input is saved locally.

### **2. The Socratic System Prompt (`lib/prompts.ts`)**
*   This is the "instruction manual" I give to the AI.
*   It explicitly forbids giving code blocks unless absolutely necessary.
*   It commands the AI to "act as a senior engineer mentoring a junior," focusing on logic gaps.

### **3. The "Deep Space" UI System**
*   **Zinc-950**: The deepest possible dark gray, used for backgrounds to reduce glare.
*   **Cyan-500/400**: The "electric" blue used for success states, active borders, and primary buttons. It signifies "intelligence" and "action."
*   **Modals**: I replaced annoying browser alerts (`window.prompt`) with custom, beautiful React Modals that blur the background and focus your attention.

### **4. Interactive Elements**
*   **Resend Logic**: If the AI gives a bad answer, "Resend" doesn't just ask again. It actually *rewinds time*, deleting the bad AI response from history before asking again.
*   **"I Give Up"**: A dedicated button that bypasses the Socratic method and asks the AI to just explain the solution plainly.

---

## 6. Project Assets

*   **Icons**: I used the `lucide-react` library. It provides clean, vector-based icons like the `BrainCircuit` (logo), `Trash2` (delete), and `Sparkles` (solve).
*   **Fonts**: The default system sans-serif font stack (Inter/Roboto/San Francisco) is used for maximum readability and zero load time, with `Monospace` for code blocks.

---

## 7. How to Read the Code

If you open the codebase, start here:
1.  **`src/App.tsx`**: The main orchestrator. It holds the layout and connects the Sidebar, Chat, and Logic.
2.  **`src/hooks/useSessions.ts`**: The data layer. Read this to understand how I save/load chats.
3.  **`src/components/ui/Modal.tsx`**: A great example of a reusable UI component.
4.  **`src/lib/gemini.ts`**: The bridge to the outside world (AI).

---
fin. :)