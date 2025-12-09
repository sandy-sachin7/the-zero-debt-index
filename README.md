# Vibe Coding Starter Kit

A template library for AI-first application prompts. This project allows you to browse, copy, and share "Vibe Coding" prompts to quickly spin up full-stack applications using AI tools like Google AI Studio, Gemini, or Copilot.

## Features

-   **Browse Templates**: View a curated list of high-quality prompts.
-   **Copy & Paste**: One-click copy for prompts to use in your AI assistant.
-   **Add Templates**: Easily add your own prompts to the library.
-   **Simple Storage**: Uses a local JSON file (`data/templates.json`) for persistence.

## Tech Stack

-   **Frontend**: Next.js (Pages Router), React, Tailwind CSS
-   **Backend**: Next.js API Routes
-   **Language**: TypeScript

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open the app**:
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

-   `/pages`: Frontend pages and API routes.
    -   `/api/templates`: API endpoints for CRUD operations.
-   `/components`: Reusable React components (Layout, etc.).
-   `/data`: Contains `templates.json` (the database).
-   `/utils`: Utility functions (storage logic).

## How to Add a New Template

1.  Click "Add Template" in the navigation bar.
2.  Fill in the details:
    -   **Title**: Name of the app/script.
    -   **Description**: Short summary.
    -   **Tags**: Keywords for categorization.
    -   **Prompt**: The actual prompt text to be pasted into an AI tool.
3.  Click "Add Template".

## Deployment

This project uses a local filesystem (`data/templates.json`) for storage. This works great for local development or running on a VPS/container where the filesystem is persistent.

**Note for Vercel/Netlify**: Since these platforms have ephemeral filesystems, the "Add Template" feature will not persist data permanently across redeploys. For production deployment on serverless platforms, you would need to swap the `utils/storage.ts` logic to use a real database (e.g., MongoDB, PostgreSQL, or Firebase).
