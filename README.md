# banco-chile-demo

This repository demonstrates a Copilot-ready project structure for building a simple React and JavaScript web application. It also includes documentation and governance for custom agents and Model Context Protocol (MCP) servers.

## Repository structure

```text
.github/
├── agents/
│   ├── documentation-specialist.agent.md
│   ├── frontend-specialist.agent.md
│   ├── security-reviewer.agent.md
│   └── test-specialist.agent.md
├── instructions/
│   └── react-webapp.instructions.md
├── skills/
│   └── react-simple-webapp/
│       └── SKILL.md
└── copilot-instructions.md

docs/
└── agent-ecosystem.md

mcp/
├── README.md
├── catalog/
│   ├── browser.json
│   ├── github.json
│   └── observability.json
└── policies/
    └── approved-tools.md
```

## Copilot configuration

- `.github/copilot-instructions.md` contains repository-wide development and quality expectations.
- `.github/instructions/react-webapp.instructions.md` contains path-specific guidance for React and JavaScript web application files.
- `.github/skills/react-simple-webapp/SKILL.md` provides reusable guidance for simple React web application tasks.
- `.github/agents/` contains focused custom agents for frontend implementation, testing, security review, and documentation.

## Agent and MCP ecosystem

[`docs/agent-ecosystem.md`](docs/agent-ecosystem.md) documents the recommended delegation model, agent responsibilities, security practices, and maintenance standards.

The [`mcp/`](mcp/) directory is the source of truth for approved MCP integrations:

- [`mcp/catalog/`](mcp/catalog/) contains catalog entries for GitHub, Browser / Playwright, and Observability servers.
- [`mcp/policies/approved-tools.md`](mcp/policies/approved-tools.md) defines allowlists, least-privilege requirements, approval rules, and secret-handling expectations.
- [`mcp/README.md`](mcp/README.md) explains registration, review, versioning, and usage requirements.

## Development focus

- Build a simple web application using React and JavaScript.
- Prefer small, focused functional components.
- Use clear, beginner-friendly naming.
- Keep dependencies minimal.
- Add or update tests when test infrastructure exists.
- Keep changes scoped and avoid unrelated refactors.

## Security and governance

- Never commit API keys, tokens, passwords, connection strings, or personal data.
- Reference credentials through environment variables or managed secrets.
- Prefer read-only MCP tools and require human approval for write, destructive, production, migration, and external communication operations.
- Redact sensitive data before it reaches an agent context.
- Review agent profiles and MCP catalog entries regularly.
