# ELIS - Explain Like I'm Stuck

An AI-powered Diagnostic Tutor that helps you debug your understanding, not just your code.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure API Key**:
    -   Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    -   Add your Google Gemini API Key to `.env`.
    -   *Alternative*: The app will prompt you for the key on first load if it's missing, and save it to LocalStorage.

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Features

-   **Split-Screen Interface**: Paste code on the left, discuss logic on the right.
-   **Diagnostic AI**: Uses Socratic questioning to identify gaps in logic.
-   **Hint Mode**: Gentle nudges towards the solution.
-   **Local Persistence**: Your problem and chat history are saved automatically.

## Tech Stack

-   React + Vite + TypeScript
-   Tailwind CSS (Slate-900 / Emerald-400 theme)
-   Google Gemini API (Generative AI)
-   Lucide React Icons
