# Final Workshop Checklist (Agent + MCP Scenario)

## Core completion
- [ ] Completed Exercises 1–5 in order (≤45 minutes total).
- [ ] Kept all changes under `/workshop` only.
- [ ] Maintained fictional/static prototype scope (not real banking software).

## Scenario delivery mapping

### Primary-agent orchestration
- [ ] Defined direct implementation scope in `workshop/exercises/01-triage-and-plan.md` notes.
- [ ] Identified delegation boundaries for frontend/test/security/documentation specialists.
- [ ] Avoided unnecessary or unrelated changes.

Related guidance:
- [README.md](../../README.md)
- [docs/agent-ecosystem.md](../../docs/agent-ecosystem.md)

### Scoped implementation quality
- [ ] Implemented/refined fictional Community Support UI in `workshop/starter/app.js`.
- [ ] Kept components functional, small, and beginner-friendly.
- [ ] Preserved accessible, readable structure in starter files.

Related guidance:
- [.github/instructions/react-webapp.instructions.md](../../.github/instructions/react-webapp.instructions.md)

### MCP governance and approval gates
- [ ] Used `mcp/catalog` and approved-tools policy as source of truth.
- [ ] Applied least-privilege and read-only-first thinking.
- [ ] Correctly identified actions needing human approval.

Related guidance:
- [mcp/README.md](../../mcp/README.md)
- [mcp/policies/approved-tools.md](../../mcp/policies/approved-tools.md)

### Security and final handoff
- [ ] Confirmed no secrets, tokens, passwords, connection strings, or personal data.
- [ ] Added concise Validation Notes and Handoff Notes in `workshop/references/example-solution.md`.
- [ ] Left a reviewer-friendly final package.

## Optional stretch (outside 45-minute core)
- [ ] Added one extra scenario action and re-ran delegation + governance decision mapping.
- [ ] Added one additional risky-operation example and approval-gate rationale.
