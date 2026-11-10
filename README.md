# Coinedone Practical QA Automation Assessment - Amazon E-Commerce Suite

A resilient, scalable Playwright + TypeScript test automation suite engineered with Page Object Model (POM) architecture, web-first assertions, and defensive security/auth boundary validations.

## 🎯 Architecture & Implementation Highlights
- **Page Object Model (POM):** Clean decoupling of DOM selectors, business workflows, and assertions across `pages/` and `tests/`.
- **Resilient Web-First Assertions:** Utilizes Playwright's built-in auto-waiting to eliminate flaky timeouts.
- **Defensive Error Handling:** Covers zero-result catalog validation, multi-tab handling for Product Detail Pages (PDP), and secure auth-guard redirects.

## ⚠️ Production Environment & 2FA/OTP Note
Automating end-to-end payment and OTP verification on Amazon.com's live production environment is restricted due to 2FA security protocols and CAPTCHA bot mitigation. In an enterprise staging/pre-prod environment, this is standardly handled via:
1. Pre-authenticated session storage states (`storageState.json`).
2. Test-account OTP bypass headers or mock SMS APIs.

**Test Scope for this Suite:** Validates the core shopping flow up to the checkout boundary: Catalog Search ➔ Results Validation ➔ Product Detail Page ➔ Add to Cart ➔ Checkout Redirect Guard ➔ Negative Credential Input Validation.

## 🚀 Execution Instructions

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Run Tests
Run the search and catalog discovery tests:
```bash
npx playwright test tests/search_filter.spec.ts