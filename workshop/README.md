# 45-Minute Workshop: Real-World Agent + MCP Workflow (Fictional Banco Vecinal)

> **Important:** This workshop creates a **fictional static prototype** and workflow simulation. It is **not** a real banking application.

This workshop is focused on a realistic delivery scenario: you are the **primary agent** delivering a small fictional website update while correctly using custom specialists and MCP governance.

## Scenario

You received a request to publish a simple “Community Support” page for fictional **Banco Vecinal**. You must deliver the page quickly, safely, and with proper delegation/governance:
- Keep implementation small and beginner-friendly.
- Delegate focused tasks to the right specialists.
- Use MCP policy/catalog as the source of truth.
- Avoid unsafe operations and unapproved capabilities.

## Prerequisites

### Learner
- Local clone of this repository.
- Ability to read/edit files.
- Read these source-of-truth docs:
  - [`README.md`](../README.md)
  - [`docs/agent-ecosystem.md`](../docs/agent-ecosystem.md)
  - [`mcp/README.md`](../mcp/README.md)
  - [`mcp/policies/approved-tools.md`](../mcp/policies/approved-tools.md)

### Facilitator
- Keep the session on the core path (≤45 minutes).
- Prompt learners to explain delegation and approval decisions, not just UI output.

---

## Core path timing (45 minutes total)

1. Exercise 1 — Triage request and design execution plan (8 min)
2. Exercise 2 — Implement scoped UI as primary agent (10 min)
3. Exercise 3 — Delegate to custom specialists (9 min)
4. Exercise 4 — MCP policy and approval-gate decisions (8 min)
5. Exercise 5 — Final security/documentation review and handoff (10 min)

**Total estimated duration: 45 minutes**

---

## Workshop files (all under `/workshop`)

- [`starter/index.html`](./starter/index.html)
- [`starter/styles.css`](./starter/styles.css)
- [`starter/app.js`](./starter/app.js)
- [`exercises/01-triage-and-plan.md`](./exercises/01-triage-and-plan.md)
- [`exercises/02-primary-agent-implementation.md`](./exercises/02-primary-agent-implementation.md)
- [`exercises/03-specialist-delegation.md`](./exercises/03-specialist-delegation.md)
- [`exercises/04-mcp-governance-gates.md`](./exercises/04-mcp-governance-gates.md)
- [`exercises/05-final-review-and-handoff.md`](./exercises/05-final-review-and-handoff.md)
- [`checklists/final-checklist.md`](./checklists/final-checklist.md)
- [`references/example-solution.md`](./references/example-solution.md)

---

## Responsible Copilot usage in this scenario

Use specialists when task boundaries are clear:
- **frontend-specialist**: focused UI/accessibility improvements.
- **test-specialist**: practical validation strategy and testability guidance.
- **security-reviewer**: secret handling, permissions, risky-operation checks.
- **documentation-specialist**: concise final docs/handoff wording.

Use MCP governance rules before actions:
- Check approved server/tool scope in [`mcp/catalog/`](../mcp/catalog/).
- Confirm policy constraints in [`mcp/policies/approved-tools.md`](../mcp/policies/approved-tools.md).
- Prefer least privilege and read-only operations by default.
- Require human approval for write, destructive, or production-impacting operations.

---

## Run the workshop

Complete in order:
1. [Exercise 1: Triage and plan](./exercises/01-triage-and-plan.md)
2. [Exercise 2: Primary-agent implementation](./exercises/02-primary-agent-implementation.md)
3. [Exercise 3: Specialist delegation](./exercises/03-specialist-delegation.md)
4. [Exercise 4: MCP governance gates](./exercises/04-mcp-governance-gates.md)
5. [Exercise 5: Final review and handoff](./exercises/05-final-review-and-handoff.md)

Then finish:
- [Final checklist](./checklists/final-checklist.md)
- [Reference outcome](./references/example-solution.md)

---

## Optional stretch work (outside 45-minute core)

- Add a second fictional page section and justify delegation boundaries again.
- Expand approval-gate notes with one additional high-risk action example.
- Improve handoff wording with documentation-specialist feedback.
