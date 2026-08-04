# MCP Catalog

This directory is the source of truth for the Model Context Protocol (MCP) servers that agents may use in this repository.

## Structure

```text
mcp/
├── README.md                  # This guide
├── catalog/                   # One JSON entry per approved server
│   ├── github.json
│   ├── browser.json
│   └── observability.json
└── policies/
    └── approved-tools.md      # Allowed tools and approval rules
```

## Registration

1. Open a pull request adding a JSON entry under `mcp/catalog/`.
2. Fill in every field: purpose, owner, data classification, environments, allowed tools, authentication, logging, and review metadata.
3. List only the tools the server actually needs, and prefer read-only tools.
4. Reference credentials by environment variable or managed secret name only. Never commit tokens, connection strings, or personal data.
5. Add the server to `mcp/policies/approved-tools.md`.
6. Obtain review from the listed owner and from a security reviewer.

## Review

- Every catalog entry has a `review.lastReviewed` and `review.nextReview` date.
- Entries are reviewed at least quarterly, or sooner when the provider, permissions, version, or data classification changes.
- Review catalog changes like application code: scope, least privilege, and secret hygiene.

## Versioning

- Pin or constrain the server version in the `version` field.
- Version changes require a new pull request and re-review of the allowed tools.
- Record deprecations in `review.decommissionPlan` before removal.

## Usage

- Agents may use only servers present in this catalog and tools listed in `allowedTools`.
- Write, destructive, or production operations require explicit human approval.
- Production data must be redacted before it reaches an agent context.
- Report the MCP servers and write-capable tools used in each pull request description.

See also [`docs/agent-ecosystem.md`](../docs/agent-ecosystem.md) and [`policies/approved-tools.md`](policies/approved-tools.md).
