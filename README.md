# Sitewise AI — Website Chatbot Builder

React + Vite + TypeScript dashboard for a website support/sales chatbot.

## Current status

The current `main` branch is a UI prototype, not a production chatbot. Some features are simulated:
- Website indexing creates random/demo crawl statistics rather than crawling a real site.
- Dashboard data is held in in-memory React state and resets on refresh.
- Checkout simulates a successful payment in the browser. It does not charge a customer or verify a provider transaction.
- Admin mode can be toggled from the URL and is not secure authorization.
- The embed snippet points to a placeholder CDN URL.

Do not use the current demo payment values, sales records, metrics, or license flow as production data.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal (default port 3000).

```bash
npm run build
npm run lint
```

## Google AI Studio

1. Open Google AI Studio and switch to **Build** mode.
2. Use **Import from GitHub** and import `nu44866-byte/Sale-chatbot`.
3. Select branch `feature/production-ready-chatbot` if the importer offers a branch selector.
4. Open `AI_STUDIO_BUILD_PROMPT.md` in the imported project and paste its contents into the AI Studio Build agent.
5. When prompted, enable Firebase integration and select the correct Google Cloud/Firebase project and Firestore location. The location choice can affect later Google Cloud resources.
6. Confirm the Gemini API key is configured as a server-side secret. Never add it to frontend code or commit it.
7. Ask the agent to run the app, build, and tests, and inspect Firestore security rules before publishing.
8. Do not publish a public URL until authentication, tenant isolation, crawler SSRF protections, and payment webhooks have been reviewed.

Google AI Studio can import GitHub projects, run a server-side Node.js environment, manage secrets, integrate Firebase Authentication/Cloud Firestore, and deploy web apps to Cloud Run. Firebase provisioning and deployment require confirmation in the AI Studio UI.

## Environment

See `.env.example` for variable names. Keep real secrets in Google AI Studio's Secrets panel or the deployment secret manager. Never commit `.env` files containing credentials.

## Production warning

A real payment provider account and webhook configuration are required before accepting payments. JazzCash, Easypaisa, Stripe, and PayPal must not be marked as enabled until their server-side integration and signed webhook verification are implemented and tested.
