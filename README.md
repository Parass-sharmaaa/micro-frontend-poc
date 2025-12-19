# Micro-Frontend POC

This project demonstrates a robust Micro-Frontend architecture using React 18, Webpack 5 Module Federation, and a centralized Design System. It features a premium, responsive UI with dark mode and 3D effects.

## Project Structure

- **host-app** (Port 3000): The main application shell and Design System provider. It orchestrates the remotes and handles global layout.
- **chat-app** (Port 3001): A standalone Chat micro-frontend with real-time UI feel.
- **email-app** (Port 3002): A standalone Email micro-frontend for managing communications.

## Architecture

We utilize **Webpack Module Federation** for seamless runtime integration.

### Key Decisions
- **Host as Design System**: The `host-app` exposes reusable, premium UI components (`Button`, `Input`, `Card`, `Typography`, etc.) consumed by all remotes.
- **Dynamic Remotes**: Configured to use environment variables (`REMOTE_CHAT_URL`, `REMOTE_EMAIL_URL`) for production, falling back to localhost for dev.
- **Inter-App Communication**: Uses an **EventBus pattern** (Custom Events) for the "Email Transcript" feature.
- **Shared State**: React Context used within apps for local state, with shared singleton dependencies (React/React-DOM) to prevent version conflicts.

## Technical Stack

- **Framework**: React 18 (Functional Components & Hooks)
- **Bundler**: Webpack 5 (Module Federation)
- **Styling**: Vanilla CSS with Tailwind CSS for utility-first styling.
- **Animations**: Modern CSS transitions and custom 3D background effects.

## Setup & Development

1.  **Install dependencies**:
    Run `npm install` in each directory: `host-app`, `chat-app`, `email-app`, and `shared`.

2.  **Start the applications**:
    Open three terminal tabs and run `npm start` in `host-app`, `chat-app`, and `email-app` respectively.

3.  **Access local development**:
    [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel/Netlify)

This project is structured as a **monorepo**. To deploy:

1.  Push the entire repository to GitHub.
2.  Create three separate projects on your deployment platform:
    - **Host**: Set root directory to `host-app`. Add Env Vars: `REMOTE_CHAT_URL` and `REMOTE_EMAIL_URL`.
    - **Chat**: Set root directory to `chat-app`.
    - **Email**: Set root directory to `email-app`.
3.  Ensure the URLs from the Chat and Email deployments are correctly added to the Host's environment variables.

## Features

- ✅ **Unified Design System**: Consistent aesthetics across all micro-frontends.
- ✅ **Runtime Integration**: Remotes load on demand without page refreshes.
- ✅ **Cross-App Logic**: Send data from the Chat app directly to the Email app.
- ✅ **Dark Mode & Premium UI**: Glassmorphism and 3D backgrounds for a state-of-the-art look.
