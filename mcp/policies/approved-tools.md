# Approved MCP Tools Policy

This policy defines which MCP servers and tools agents may use in this repository.

## Principles

- **Allowlist only.** A tool may be used only if it appears in the server's `allowedTools`.
- **Read-only by default.** Write, destructive, and production operations require explicit human approval.
- **Least privilege.** Request the smallest capability that satisfies the task.
- **No committed secrets.** Credentials are referenced by environment variable or managed secret name only.
- **Redaction first.** Sensitive fields are redacted before data reaches an agent context.

## Approved servers

| Server | Catalog entry | Default access | Environments | Owner |
| --- | --- | --- | --- | --- |
| GitHub | [`catalog/github.json`](../catalog/github.json) | Read-only | development, test | platform-engineering |
| Browser / Playwright | [`catalog/browser.json`](../catalog/browser.json) | Read-only navigation | local, test | frontend-guild |
| Observability | [`catalog/observability.json`](../catalog/observability.json) | Read-only, redacted | test, staging | sre-team |

Any server not listed here is unapproved and must not be used.

## Operations requiring human approval

- Merging, pushing, deleting, or otherwise writing to repositories.
- Any query or action against production systems or production data.
- Database migrations or writes of any kind.
- Sending external communications.
- Uploading files or navigating to non-test hosts.

## Approval process

1. Open a pull request that adds or updates the catalog entry and this table.
2. Justify each requested tool and the data it can reach.
3. Obtain approval from the server owner and a security reviewer.
4. Set `review.lastReviewed` and `review.nextReview` in the catalog entry.

## Review and decommissioning

- Review all entries at least quarterly, or immediately when permissions, providers, versions, or data classification change.
- Remove unused servers and revoke their secrets rather than leaving dormant access in place.

See [`../README.md`](../README.md) and [`../../docs/agent-ecosystem.md`](../../docs/agent-ecosystem.md).
