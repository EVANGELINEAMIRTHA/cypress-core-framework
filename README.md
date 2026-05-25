# 🚀 Cypress Core Automation Framework

A scalable, AI-aware end-to-end automation framework built using Cypress, JavaScript, API Testing, POM Architecture, Visual Regression Testing, and CI/CD practices.

Designed to align with modern SDET expectations and enterprise QA engineering standards including UI testing, API validation, integration testing, AI-enabled testing concepts, and automation framework scalability.

---

# 📌 Project Highlights

✅ End-to-End UI Automation
✅ API Testing with `cy.request()`
✅ Page Object Model (POM) Architecture
✅ Data-Driven Testing using Fixtures
✅ Custom Cypress Commands
✅ Session Handling with `cy.session()`
✅ Network Intercepts & API Synchronization
✅ Percy Visual Regression Testing
✅ Allure Reporting Integration
✅ GitHub Actions CI/CD Pipeline
✅ Hybrid UI + API Integration Testing
✅ Smart Synchronization & Flaky Test Reduction
✅ AI-Testing Awareness & Self-Healing Concepts

---

# 🛠️ Tech Stack

| Technology     | Purpose                      |
| -------------- | ---------------------------- |
| Cypress        | UI & API Automation          |
| JavaScript     | Framework Development        |
| Percy          | Visual AI Regression Testing |
| Allure Reports | Reporting & Test Analytics   |
| GitHub Actions | CI/CD Pipeline               |
| Fixtures       | Data-Driven Testing          |
| POM            | Scalable Test Architecture   |
| cy.intercept   | Network Layer Validation     |
| cy.request     | API Validation               |

---

# 📂 Framework Structure

```bash
cypress/
│
├── e2e/
│   ├── frontend/
│   ├── api/
│   ├── integration/
│
├── fixtures/
│   └── example.json
│
├── pages/
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── CheckoutPage.js
│
├── support/
│   ├── commands.js
│   ├── e2e.js
│
├── screenshots/
├── snapshots/
│
.github/
└── workflows/
    └── cypress.yml
```

---

# ✅ Features Implemented

# 1️⃣ UI Automation

Automated:

* User Signup
* Login Flow
* Add To Cart
* Checkout
* Payment
* Order Confirmation

Covered:

* Assertions
* Validations
* Dynamic waits
* DOM synchronization
* Reusable workflows

---

# 2️⃣ API Testing

Implemented direct backend validation using:

```js
cy.request()
```

Covered:

* Login API validation
* Account creation API validation
* Negative testing
* Boundary testing
* Response validation
* Status code validation

Examples:

* `POST /api/verifyLogin`
* `POST /api/createAccount`

---

# 3️⃣ Hybrid UI + API Integration Testing

Implemented:

* Session-based authentication
* API-backed UI validation
* Real backend verification
* Frontend/backend synchronization

---

# 4️⃣ Network Intercepts

Implemented:

```js
cy.intercept()
```

Covered:

* Request aliasing
* Backend synchronization
* API monitoring
* Request validation
* Smart waits

---

# 5️⃣ Session Optimization

Implemented:

```js
cy.session()
```

Benefits:

* Faster execution
* Reduced repetitive login
* Stable authentication flows
* Runtime optimization

---

# 6️⃣ AI-Enabled Testing

## Percy Visual Regression Testing

Implemented:

* Snapshot comparison
* Layout drift detection
* Visual UI validation

## Self-Healing Testing Awareness

Applied concepts:

* Stable selectors
* Defensive locator strategy
* Dynamic synchronization
* Resilient DOM handling

---

# 7️⃣ Reporting

Integrated:

* Allure Reports
* Screenshots on failure
* Snapshot evidence
* Execution reporting

---

# 8️⃣ CI/CD Integration

Configured:

* GitHub Actions
* Automated Cypress execution
* CI-ready framework setup

---

# ▶️ Installation

Clone repository:

```bash
git clone https://github.com/EVANGELINEAMIRTHA/cypress-core-framework.git
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run Cypress

Open Cypress UI:

```bash
npx cypress open
```

Run headless execution:

```bash
npx cypress run
```

---

# ▶️ Run Percy Visual Tests

```bash
npx percy exec -- cypress run
```
<img width="760" height="610" alt="image" src="https://github.com/user-attachments/assets/0537eee6-9f33-4515-8393-a1a430e6f82f" />

---

# ▶️ Generate Allure Report

```bash
allure generate allure-results --clean -o allure-report
```

Open report:

```bash
allure open allure-report
```
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/6e1d3e16-41d1-460e-90ae-fc62db14314a" />
<img width="1360" height="637" alt="image" src="https://github.com/user-attachments/assets/254cea58-14be-43d7-a862-3b9c8c940b12" />


---

# 📌 Key QA Engineering Concepts Covered

* Functional Testing
* Regression Testing
* Integration Testing
* API Testing
* Visual Regression Testing
* Data-Driven Testing
* POM Architecture
* Flaky Test Reduction
* Synchronization Strategies
* CI/CD Readiness
* Automation Framework Design

---

# 🎯 Interview-Focused Highlights

This framework demonstrates:

* Real-world Cypress framework architecture
* Modern SDET practices
* Scalable automation design
* UI + API hybrid validation
* AI-enabled testing awareness
* CI/CD integration readiness
* Enterprise QA engineering standards

---

# 👩‍💻 Author

Evangeline Amirtha

GitHub:
https://github.com/EVANGELINEAMIRTHA

Project Repository:
https://github.com/EVANGELINEAMIRTHA/cypress-core-framework
