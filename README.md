# Micro-Frontend POC

This project demonstrates a Micro-Frontend architecture using React 18, Webpack 5 Module Federation, and a centralized Design System.

## Project Structure

- **host-app** (Port 3000): The main application shell and Design System provider. orchestrates the micro-frontends.
- **chat-app** (Port 3001): A standalone Chat micro-frontend.
- **email-app** (Port 3002): A standalone Email micro-frontend.

## Architecture

We utilize **Webpack Module Federation** to share code dynamically at runtime.

### Key Decisions
- **Host as Design System**: The `host-app` exposes reusable components (`Button`, `Input`, `Card`, etc.) which are consumed by `chat-app` and `email-app`. This ensures consistency and reduces bundle size.
- **Lazy Loading**: Remote apps are loaded lazily using `React.lazy` and `Suspense` to improve initial load time.
- **Communication**: We use **Custom Events** (`chat:email-transcript`) for loose coupling. The Chat app dispatches an event, and the Email app listens for it, preserving independence.
- **Styling**: Standard CSS / CSS Modules are used to keep things simple and isolated.

## Prerequisites

- Node.js (v14+)
- npm (v6+)

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd Micro-frontend-project
    ```

2.  **Install dependencies** for each application:
    ```bash
    cd host-app && npm install
    cd ../chat-app && npm install
    cd ../email-app && npm install
    ```

3.  **Start the applications**:
    You need to run all three apps simultaneously. Open three terminal tabs:

    **Tab 1 (Host):**
    ```bash
    cd host-app
    npm start
    ```

    **Tab 2 (Chat):**
    ```bash
    cd chat-app
    npm start
    ```

    **Tab 3 (Email):**
    ```bash
    cd email-app
    npm start
    ```

4.  **Access the App**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Functionality

- **Navigation**: Use the Top Navbar to switch between Home, Chat, and Email.
- **Deep Linking**: Refreshing on `/chat` or `/email` works (handled by `historyApiFallback`).
- **Interaction**:
    1. Go to **Chat**.
    2. Click **Email Transcript**.
    3. Go to **Email**.
    4. You should see a notification or the draft fields pre-filled with the chat transcript.

## Tech Stack

- React 18
- Webpack 5 (Module Federation)
- Babel
- React Router v6
