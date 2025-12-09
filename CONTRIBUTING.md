# Contributing to The Zero-Debt Index

We welcome contributions! This project follows a **GitOps workflow**, meaning all templates are managed via this repository and automatically synced to the live application upon merge.

## How to Contribute

1.  **Fork the Repository**: Click the "Fork" button at the top right of this page.
2.  **Clone your Fork**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/the-zero-debt-index.git
    ```
3.  **Create a Branch**:
    ```bash
    git checkout -b add-my-awesome-template
    ```
4.  **Add your Template**:
    *   Open `data/templates.json`.
    *   Add a new object to the array. **Please ensure you use a unique ID** (increment the highest existing ID).
    *   Follow the JSON structure strictly:
        ```json
        {
          "id": "150",
          "title": "My Awesome Template",
          "description": "A brief description of what this app does.",
          "tags": ["React", "Level 3", "Cool Tech"],
          "prompt": "**System Role**: ... \n**Objective**: ... \n**CRITICAL INSTRUCTIONS**: ...",
          "author": "Your Name",
          "createdAt": "2025-12-10T12:00:00Z"
        }
        ```
5.  **Validate JSON**: Ensure `data/templates.json` is valid JSON. You can use an online validator or run `node -e "require('./data/templates.json')"` to check for syntax errors.
6.  **Commit and Push**:
    ```bash
    git add data/templates.json
    git commit -m "Add My Awesome Template"
    git push origin add-my-awesome-template
    ```
7.  **Open a Pull Request**: Go to the original repository and click "New Pull Request".

## Template Guidelines

*   **The Zero-Debt Index Philosophy**: Prompts should be high-level, intent-based, and let the AI handle the implementation details.
*   **Structure**:
    *   **System Role**: Define the persona (e.g., "Senior React Engineer").
    *   **Objective**: Clear goal.
    *   **Critical Instructions**: Non-negotiable constraints or architectural decisions.
    *   **Verification**: How to verify the result (Visual Check).
*   **Difficulty**: Tag with `Level 1` (Beginner) to `Level 5` (God Mode).

## Review Process

*   An admin will review your PR.
*   Once merged, a GitHub Action will automatically sync your template to the live Firebase database.
