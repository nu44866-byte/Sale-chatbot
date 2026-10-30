# Sitewise AI — Google AI Studio implementation brief

Import this repository in Google AI Studio Build mode and implement the following as a real full-stack application. Do not merely describe changes: edit the code, run the app, fix build/runtime errors, and verify each flow in the preview.

## Existing app and critical findings
- Existing UI is a React 19 + Vite + TypeScript dashboard.
- `src/App.tsx` keeps all data in React component state and seeds it from `src/data/mockData.ts`; refresh loses changes.
- `src/components/WebsitesView.tsx` currently fabricates crawl results with random numbers and sample text. It does not crawl a site.
- `src/components/PaymentModal.tsx` currently simulates payment success with a timeout and generates a license locally. This is NOT a real payment integration and must never be presented as a completed payment.
- `src/data/mockData.ts` contains demo customer/sales records and placeholder-looking payment gateway values. Do not treat them as real customers, transactions, or credentials.
- `src/components/InstallWidgetView.tsx` references a made-up `cdn.sitewise.ai/widget.v1.js` URL. Replace it with a real widget endpoint and generated install code only after the widget endpoint exists.
- `.env.example` documents `GEMINI_API_KEY` and `APP_URL`. Keep Gemini credentials server-side only.

## Required architecture
1. Keep the current React dashboard and visual style, but add a Node.js server-side API layer supported by Google AI Studio Build mode.
2. Use Gemini through the server-side `@google/genai` SDK and the `GEMINI_API_KEY` secret. Never put API keys in browser code, localStorage, HTML, or public config.
3. Use Firebase Authentication (Google sign-in) and Cloud Firestore for persistent data. Ask the builder to enable the Firebase integration if it is not configured. Create and review Firestore security rules: clients may only read/write their own tenant data; admin-only actions must be enforced server-side using verified auth claims/roles, not a URL query parameter or client state.
4. Add tenant-scoped collections for users/tenants, chatbot configs, websites, crawled pages/chunks, conversations/messages, leads, licenses, payment events, promo codes, and audit logs. Include createdAt/updatedAt timestamps and server-side validation.
5. Replace all seeded fake production metrics and fake customer records with honest empty states. Demo data may exist only behind an explicit demo mode clearly labeled as sample data.
6. Build a secure server-side chat endpoint. Validate auth, rate-limit requests, load the tenant's chatbot configuration and indexed website content, pass relevant retrieved excerpts to Gemini, and return concise grounded answers. If no indexed evidence exists, the bot must say it does not know rather than invent facts. Store conversation/message records in Firestore.
7. Implement website indexing as a real server-side crawl: validate and normalize HTTP(S) URLs, block localhost/private/link-local/reserved IP ranges and redirects into them (SSRF protection), enforce timeouts/response-size/page-count limits, respect robots.txt and site terms, parse readable text, deduplicate pages, chunk content, and store source URLs/titles/timestamps in Firestore. Never claim a site is indexed until indexing succeeds. Add progress/error states and a real re-index action.
8. Implement lead capture with consent, validation, tenant isolation, and a leads view/export. Do not collect unnecessary sensitive data.
9. Build the embeddable chat widget as a real versioned static asset served by this app. Its public API must use an opaque public chatbot ID, validate the allowed origin server-side, and call a rate-limited public chat endpoint. Do not expose private tenant data or admin APIs through the widget.
10. Payments: do not simulate card, JazzCash, Easypaisa, or PayPal payments. Do not generate/activate a license based on a browser callback or timeout. Either integrate a selected provider using server-side secrets and verified signed webhooks, or disable checkout and clearly show “payments not configured.” Only verified successful provider webhooks may create payment records and activate licenses. Never store card numbers/CVC. Promo codes must be checked server-side.
11. Add server-side admin authorization and audit logs. Remove the insecure `?admin=true` / `#admin` role switch as an authorization mechanism. A UI toggle is not security.
12. Add tests for auth/tenant isolation, crawl URL safety, indexing status, grounded chat, webhook verification, and license activation. Add a production build/typecheck and fix all errors.
13. Add loading, empty, success, and actionable error states; ensure mobile responsiveness and accessible controls.

## Delivery requirements
- First inspect the entire repository and explain any missing external setup.
- Make the smallest coherent implementation that actually runs; do not add dead placeholder endpoints.
- Do not claim payments, crawling, persistence, authentication, or deployment are working unless verified end-to-end.
- Document all required Google AI Studio Secrets and Firebase setup. Do not commit secrets.
- Run `npm run build` and `npm run lint`; report exact results and any remaining manual setup.
- Keep changes on the current feature branch and open a pull request to `main` for review. Do not deploy publicly until the owner reviews payment, security rules, and costs.
