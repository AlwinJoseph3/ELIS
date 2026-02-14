# 🧠 ELIS (Explain Like I'm Stuck)

> **The AI Diagnostic Tutor for Logic, Not Just Code.**

![Version](https://img.shields.io/badge/version-0.1.0--alpha-cyan)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20Vite%20%7C%20Gemini-zinc)
![License](https://img.shields.io/badge/license-MIT-blue)

ELIS is a **Socratic AI Tutor** designed to help developers identify *logic gaps* rather than spoon-feeding answers. Unlike standard coding assistants that generate code, ELIS forces you to articulate your "Stuck Point" and guides you to the solution through targeted questioning.

Built with a **Cyber-Minimalist** aesthetic using a **Deep Space (Zinc/Cyan)** theme, it provides a distraction-free environment for deep debugging.

---

## ✨ Features

### 🔍 Diagnostic Core
- **Socratic Engine**: Powered by Google's Gemini AI, tuned to ask questions instead of giving answers.
- **Stuck Point Analysis**: Forces you to articulate exactly *where* your logic breaks down before diving into code.
- **Hint Mode**: stuck? Get a gentle nudge in the right direction without spoiling the solution.
- **"I Give Up" Protocol**: When you've truly hit a wall, get the full breakdown and solution.

### ⚡ Cyber-Minimalist UI
- **Split-Screen Workflow**: Dedicated "Problem Context" (left) and "Diagnostic Chat" (right) panes.
- **Deep Space Theme**: A heavily customized **Zinc-950** & **Cyan-500** palette optimized for late-night coding sessions.
- **Visual Feedback**:
  - 🟢 **Animated Status**: Pulse indicators for AI thinking and API status.
  - 🎉 **Dopamine Hits**: Confetti celebrations when you finally bridge the logic gap.
  - 📝 **Markdown Support**: Full syntax highlighting for code blocks and formatted text.

### 🛡️ Local-First & Privacy
- **Zero Backend**: All chat history and sessions are stored in your browser's `localStorage`.
- **BYOK (Bring Your Own Key)**: Your Google Gemini API Key is stored locally on your device. It is never sent to our servers (because we don't have any).
- **Session Management**: Create, renaming (auto-generated), and delete diagnostic sessions seamlessly.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Config)
- **AI Model**: [Google Gemini Pro](https://ai.google.dev/) via `@google/generative-ai`
- **Icons**: [Lucide React](https://lucide.dev/)
- **State**: React Hooks + LocalStorage
- **Utils**: `date-fns`, `canvas-confetti`, `react-markdown`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A specific, burning logic problem you can't solve.
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey) (Free tier available).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/elis-tutor.git
    cd elis-tutor
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Navigate to `http://localhost:5173`.

### Configuration

On the first launch, ELIS will prompt you for your **Gemini API Key**.
- This key is saved to your browser's `localStorage`.
- You can reset/remove the key at any time by clicking the **API ACTIVE** indicator in the header.

---

## 📖 Usage Guide

1.  **The Setup**:
    - Paste your problematic code or logic description into the **Left Panel**.
    - This gives the AI context but doesn't trigger a response yet.

2.  **The Stuck Point**:
    - In the **Right Panel**, type exactly what you are trying to achieve and where you are stuck.
    - *Example*: "I'm trying to filter this array, but it keeps returning empty objects."

3.  **The Dialogue**:
    - ELIS will analyze your code and your stuck point.
    - It will ask a clarifying question to check your assumptions.
    - Answer the question. Continue the dialogue.

4.  **The Breakthrough**:
    - Once you identify the flaw in your logic, tell ELIS contextually or fix the code.
    - If ELIS detects the problem is solved, it will celebrate with you! 🎉

---

## 🎨 Theme System

ELIS uses a custom Tailwind configuration for its "Deep Space" aesthetic:

| Color Token | Hex Code | Usage |
|:------------|:---------|:------|
| `bg-zinc-950`| `#09090b` | Main Background |
| `text-zinc-100`| `#f4f4f5` | Primary Text |
| `text-cyan-400`| `#22d3ee` | Accents & Highlights |
| `text-cyan-500`| `#06b6d4` | Interactive Elements |
| `border-zinc-800`| `#27272a`| Subtle Borders |

---

## 🤝 Contributing

Contributions are welcome! Whether it's fixing bugs, improving the prompt engineering, or adding new features.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

> *"The best way to learn is to struggle just enough to find the answer yourself."*
