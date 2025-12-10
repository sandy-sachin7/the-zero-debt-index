# Gemini Vibe Station ✦

**Live Demo**: [https://geminivibestation.vercel.app/](https://geminivibestation.vercel.app/)

The ultimate collection of "God-Tier" prompts for AI-first software development. This project allows you to browse, copy, and share structured **Agent Specs** to quickly spin up full-stack applications using tools like Google AI Studio, Gemini, or Cursor.

> "Built in 2 hours using Google AI Studio. 100% Vibe Coded."

## ✨ Features

-   **Enterprise-Grade Schema**: Templates are not just text; they are structured JSON objects with typed `inputs`, explicit `systemRole`, execution `phases`, and `verification` steps.
-   **Agent-Ready**: One-click "Copy JSON" to feed directly into autonomous agents.
-   **Google Light Theme**: A clean, professional UI inspired by Google's design system.
-   **GitOps Workflow**: Templates are managed via Pull Requests. Merging to `main` automatically syncs data to Firestore.
-   **Vibe Coding**: Curated for high-frequency, low-friction development.

## 🛠️ Tech Stack

-   **Frontend**: Next.js (Pages Router), React, Tailwind CSS (v4)
-   **Backend**: Firebase (Firestore)
-   **Deployment**: Vercel (Frontend) + GitHub Actions (Data Sync)
-   **Language**: TypeScript

## 🚀 Getting Started

### Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sandy-sachin7/the-zero-debt-index.git
    cd the-zero-debt-index
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env.local` file with your Firebase Client configuration:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to vibe.

## 🤝 How to Contribute

We use a **GitOps** workflow. The source of truth for templates is `data/templates.json`.

1.  **Fork & Clone** the repo.
2.  **Add your Template** to `data/templates.json`. Follow the schema:
    ```json
    {
      "id": "unique-id",
      "title": "My Awesome Agent",
      "description": "What does it do?",
      "tags": ["Web", "React"],
      "inputs": [],
      "systemRole": "You are a...",
      "phases": [],
      "verification": {}
    }
    ```
3.  **Submit a Pull Request**.
4.  Once merged, a GitHub Action will automatically validate and sync your template to the live Firestore database.

## 📄 License

Open Source. Vibe freely.
