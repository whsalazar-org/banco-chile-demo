# 45-Minute Workshop: Build a Fictional Banco Vecinal Prototype (Static)

> **Important:** This workshop builds a **fictional static prototype** for learning purposes. It is **not** a real banking application.

This self-contained workshop helps you practice the repository’s React + JavaScript and Copilot best practices in short, incremental exercises.

## Workshop goals

By the end, you will have a small fictional website prototype and you will have practiced:
- Small, focused functional components
- Beginner-friendly naming and scoped changes
- Following repository instructions and reusable guidance
- Security and governance habits for agents and MCP tools
- Lightweight validation and documentation wrap-up

## Prerequisites

### Learner
- You have cloned this repository locally.
- You can create and edit files.
- You can read repository docs in:
  - [`README.md`](../README.md)
  - [`docs/agent-ecosystem.md`](../docs/agent-ecosystem.md)
  - [`mcp/README.md`](../mcp/README.md)
  - [`mcp/policies/approved-tools.md`](../mcp/policies/approved-tools.md)

### Facilitator
- Ensure learners understand this is a static prototype workshop.
- Keep learners on the timed core path (≤45 minutes).
- Encourage short reflections after each exercise.

---

## Core path timing (45 minutes total)

1. Exercise 1 — Starter structure and theme (8 min)
2. Exercise 2 — Build focused UI components (12 min)
3. Exercise 3 — Apply instructions, skills, and specialist delegation (8 min)
4. Exercise 4 — Add practical validation step (7 min)
5. Exercise 5 — Security/MCP governance review + final docs review (10 min)

**Total estimated duration: 45 minutes**

---

## Files you will create in `/workshop`

- [`starter/index.html`](./starter/index.html)
- [`starter/styles.css`](./starter/styles.css)
- [`starter/app.js`](./starter/app.js)
- [`exercises/01-starter-structure.md`](./exercises/01-starter-structure.md)
- [`exercises/02-focused-ui.md`](./exercises/02-focused-ui.md)
- [`exercises/03-copilot-practices.md`](./exercises/03-copilot-practices.md)
- [`exercises/04-validation.md`](./exercises/04-validation.md)
- [`exercises/05-security-and-wrapup.md`](./exercises/05-security-and-wrapup.md)
- [`checklists/final-checklist.md`](./checklists/final-checklist.md)
- [`references/example-solution.md`](./references/example-solution.md)

---

## How to use Copilot responsibly in this workshop

Use specialist agents only when they add value to a focused task:

- **Frontend specialist**: ask for help refining small React/JS UI pieces and accessibility.
- **Test specialist**: ask for help drafting practical validation/test steps when infrastructure exists.
- **Security reviewer**: ask for a focused pass on secret handling, permissions, and risky operations.
- **Documentation specialist**: ask for concise, clear markdown improvements.

Good governance habits:
- Use the MCP catalog and approved-tools policy as your source of truth:
  - [`mcp/catalog/`](../mcp/catalog/)
  - [`mcp/policies/approved-tools.md`](../mcp/policies/approved-tools.md)
- Prefer read-only integrations and least privilege.
- Require human approval for write, destructive, or production-impacting operations.
- Never hardcode secrets, tokens, passwords, connection strings, or personal data.

---

## Run the workshop

Follow the exercises in order; each one builds on previous files:

1. [Exercise 1: Starter structure and theme](./exercises/01-starter-structure.md)
2. [Exercise 2: Build focused UI components](./exercises/02-focused-ui.md)
3. [Exercise 3: Apply instructions, skills, and specialist delegation](./exercises/03-copilot-practices.md)
4. [Exercise 4: Add practical validation](./exercises/04-validation.md)
5. [Exercise 5: Security/MCP governance review + wrap-up](./exercises/05-security-and-wrapup.md)

Then complete:
- [Final checklist](./checklists/final-checklist.md)
- [Reference outcome](./references/example-solution.md)

---

## Optional stretch work (beyond core 45 minutes)

Clearly optional ideas after the core workshop:
- Add one extra presentational section (e.g., FAQ) while keeping component boundaries small.
- Expand validation notes with one additional manual accessibility check.
- Improve docs wording using the documentation specialist.

