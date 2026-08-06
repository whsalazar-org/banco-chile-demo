---
marp: true
theme: default
paginate: true
title: Secure and Centralized Local Agents for Institutional Repositories
---

# Secure and Centralized Local Agents

## Making approved agent capabilities available across bank repositories

**Audience:** Engineering, platform, cybersecurity, risk, and repository owners  
**Scope:** Local IDE/CLI agents, custom agent profiles, and MCP integrations

<!-- Speaker notes: The objective is not to eliminate local agents. It is to make local autonomy operate inside centrally governed boundaries. -->

---

## Executive message

> **Centralize policy, distribution, and evidence — not every developer workflow.**

A bank should provide:

- A centrally governed catalog of approved agents and tools.
- Reusable profiles with least-privilege instructions and permissions.
- Repository-level controls for local exceptions.
- Strong identity, secret isolation, data classification, and auditability.
- Human approval for production, destructive, external, or regulated actions.

[GitHub: Agent management for enterprises](https://docs.github.com/en/copilot/concepts/agents/enterprise-management)  
[NIST: AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

---

## What “local agent” means

| Capability | Typical location | Central governance approach |
| --- | --- | --- |
| Repository custom agent | `.github/agents/` | Versioned with the repository |
| Organization custom agent | Organization `.github` or `.github-private` repository | Shared across organization repositories |
| Enterprise custom agent | Designated enterprise `.github-private` repository | Shared across enterprise organizations |
| IDE/CLI local agent | Developer workstation | Managed through approved profiles, policies, endpoint controls, and monitoring |
| Local MCP server | Developer workstation | Register exact server ID, constrain tools, secrets, network, and data |

**Important distinction:** IDE-local agents are an IDE capability; GitHub does not manage their local configuration directly. Central governance must therefore combine GitHub policies with endpoint, identity, network, and repository controls.

[GitHub: About custom agents](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/copilot-cli/about-custom-agents)  
[GitHub: Agent management for enterprises](https://docs.github.com/en/copilot/concepts/agents/enterprise-management)

---

## Target operating model

```text
Enterprise AI governance
        |
        +-- Approved agent catalogue and release process
        +-- MCP registry and allowlist
        +-- Identity, data, network, and endpoint controls
        +-- Audit, risk metrics, and incident response
        |
Organization platform repository
        |
        +-- Shared agents, instructions, skills, templates
        |
Institutional repository
        |
        +-- Scoped agent configuration
        +-- Repository MCP settings
        +-- Tests, branch protection, and review evidence
        |
Developer workstation
        |
        +-- Local runtime using only approved profiles and tools
```

**Design principle:** policy flows downward; evidence flows upward.

---

## Central distribution pattern

### 1. Enterprise baseline

- Define mandatory security, privacy, and acceptable-use rules.
- Assign ownership for agents, MCP servers, data domains, and approvals.
- Establish risk tiers: low, moderate, high, and prohibited.

### 2. Organization catalogue

- Publish reusable agents in the organization’s `.github` or `.github-private` repository.
- Prefer internal visibility for collaboration and private visibility for sensitive operating guidance.
- Release changes through pull requests, security review, and versioned changelogs.

### 3. Repository adoption

- Allow repositories to consume the baseline without copying it.
- Permit narrowly justified local extensions.
- Require repository owners to document exceptions and expiration dates.

[GitHub: Preparing to use custom agents in your organization](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents)

---

## Agent profile: minimum safe contract

Every centrally published agent should define:

- **Purpose:** one business or engineering responsibility.
- **Scope:** repositories, paths, environments, and data domains.
- **Allowed tools:** the smallest required set; read-only by default.
- **Forbidden actions:** secrets, production writes, destructive commands, and unapproved outbound communication.
- **Workflow:** inspect → plan → implement → test → security review → report.
- **Approval gates:** actions that require a named human approver.
- **Output contract:** files changed, checks run, tools used, risks, and follow-up work.
- **Owner and lifecycle:** version, support contact, review date, and decommission plan.

**Rule:** an agent profile is production configuration. Review it like application code.

---

## Secure local-agent onboarding

1. Authenticate with the bank’s approved identity provider and device posture controls.
2. Install only approved IDE, CLI, agent runtime, and extension versions.
3. Pull agent profiles from the organization or enterprise catalogue.
4. Apply repository instructions and path-specific rules.
5. Use short-lived, scoped credentials from a managed secret provider.
6. Block sensitive files and production data from agent context.
7. Run local validation: secret scan, lint, tests, dependency checks, and policy checks.
8. Record agent, profile version, repository, tools, approvals, and result in the pull request.

**Never:** paste credentials, customer data, private keys, tokens, or production connection strings into an agent conversation.

---

## MCP governance: central registry, local execution

Use an MCP registry as the source of truth for approved servers.

- Register server identity, owner, purpose, version, data classification, and environments.
- Allowlist tools individually; prefer read-only operations.
- Use managed secrets or environment references, never committed values.
- Enforce network egress, timeouts, rate limits, redaction, and logging.
- Separate development, test, staging, and production servers.
- Require human approval for write, destructive, migration, and production actions.
- Re-review when the provider, version, permission, or data classification changes.

When using **Registry only**, local MCP servers must appear in the registry with the exact installed server ID. GitHub documents current enforcement limitations, so endpoint and configuration controls remain necessary.

[GitHub: MCP server usage in your company](https://docs.github.com/en/copilot/concepts/mcp-management)  
[GitHub: MCP allowlist enforcement](https://docs.github.com/en/copilot/reference/mcp-allowlist-enforcement)

---

## Permission model: separate read from act

| Risk tier | Examples | Default treatment |
| --- | --- | --- |
| Tier 0 — Observe | Read repository metadata, documentation, synthetic test data | Allow with logging |
| Tier 1 — Prepare | Draft code, tests, queries, or pull request descriptions | Allow; validate before merge |
| Tier 2 — Change | Create commits, open PRs, update non-production systems | Human approval and branch protection |
| Tier 3 — Impact | Production deployment, data mutation, migration, external communication | Dual approval, change record, break-glass controls |
| Prohibited | Credential retrieval, unrestricted production access, bypassing controls | Deny and alert |

**Least privilege is a lifecycle property:** review permissions after every feature, server, or ownership change.

---

## Data protection and context boundaries

### Classify before connecting

- Public: may use approved external context.
- Internal: use institution-controlled services and repositories.
- Confidential: minimize, redact, and restrict by role and purpose.
- Regulated/customer data: use only approved, isolated workflows with explicit authorization.

### Apply defense in depth

- Exclude secrets, keys, sensitive configuration, and customer fixtures from context.
- Use synthetic or masked data for development and testing.
- Treat issues, tickets, web pages, and dependency documentation as untrusted data.
- Prevent agents from echoing authorization headers, cookies, tokens, or personal data.
- Define retention, residency, and deletion requirements for prompts, traces, and logs.

[OWASP: Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

---

## Repository controls that make the model enforceable

Every institutional repository should inherit or implement:

- `.github/copilot-instructions.md` for mandatory baseline rules.
- Path-specific instructions for sensitive components.
- Approved custom agents and skills only.
- Repository MCP settings constrained to approved servers.
- Branch protection and required reviews.
- Secret scanning and push protection.
- Code scanning, dependency review, and lockfile validation.
- CODEOWNERS for security, platform, and data-domain approval.
- A pull request template requiring agent and MCP usage disclosure.

This repository’s reference implementation includes [`docs/agent-ecosystem.md`](../agent-ecosystem.md), [`mcp/README.md`](../../mcp/README.md), and [`mcp/policies/approved-tools.md`](../../mcp/policies/approved-tools.md).

---

## Pull request evidence standard

Require every agent-assisted change to answer:

- Which agent and profile version were used?
- Which repository, organization, or enterprise policy was active?
- Which MCP servers and tools were invoked?
- Did any write-capable or production-capable tool run?
- Who approved elevated actions?
- What data classification entered the context?
- Which tests, scans, and policy checks passed?
- What risks, limitations, or follow-up actions remain?

**If the activity cannot be reconstructed, it cannot be reliably governed.**

---

## Lifecycle and accountability

```text
Propose → Threat model → Security review → Pilot
    → Publish → Monitor → Recertify → Update or retire
```

### Minimum lifecycle controls

- Named business and technical owner.
- Versioned profile and MCP manifest.
- Test suite with allowed and forbidden behavior.
- Review at least quarterly and after material changes.
- Usage, exception, and incident metrics.
- Immediate revocation path for compromised tools or credentials.
- Decommission plan for unused or unsupported agents.

Use progressive rollout: pilot group → low-risk repositories → broader adoption → regulated workloads only after evidence.

---

## Implementation roadmap for the bank

| Phase | Deliverables | Exit criteria |
| --- | --- | --- |
| 1. Foundation | Owners, risk tiers, baseline instructions, repository inventory | Accountable owners and prohibited actions documented |
| 2. Catalogue | Approved agents, MCP registry, versioning, review workflow | Developers can discover approved capabilities |
| 3. Guardrails | Identity, endpoint posture, secret isolation, context exclusion | Unsafe local configurations are blocked or detected |
| 4. Repository gates | Branch protection, scans, CODEOWNERS, PR evidence template | Agent changes meet normal engineering controls |
| 5. Observability | Audit events, usage metrics, exception workflow, incident response | Security can reconstruct and respond to activity |
| 6. Scale | Progressive enablement by organization and risk tier | Adoption increases without permission sprawl |

---

## Metrics that matter

### Adoption

- Percentage of repositories using the approved baseline.
- Percentage of active agents from the central catalogue.
- Time from approval to developer availability.

### Security and governance

- Unapproved local agents or MCP servers detected.
- Secrets blocked by push protection.
- PRs with complete agent/tool evidence.
- Exceptions past expiration.
- Catalogued tools past review date.
- High-risk actions requiring approval versus bypass attempts.

### Quality and resilience

- Security findings per agent-assisted change.
- Mean time to revoke or remediate a compromised capability.
- Failed policy checks and recurring root causes.
- Agent availability, latency, and error rates.

**Optimize for governed productivity, not raw automation volume.**

---

## Decision checklist

Before enabling a local agent in an institutional repository, confirm:

- [ ] Owner, purpose, scope, and risk tier are documented.
- [ ] Profile is centrally published or explicitly approved as an exception.
- [ ] Tools and MCP servers are allowlisted.
- [ ] Read-only access is the default.
- [ ] Secrets use managed identity or secret references.
- [ ] Sensitive data is excluded, masked, or isolated.
- [ ] Production and destructive actions have approval gates.
- [ ] Repository checks and branch protections are active.
- [ ] Logs and pull request evidence are retained appropriately.
- [ ] Review, revocation, and decommission dates are defined.

---

# Closing recommendation

## Make the safe path the easiest path

- **Centralize** profiles, registries, policies, and ownership.
- **Localize** execution where developers need speed.
- **Constrain** tools, data, networks, and credentials.
- **Verify** output with deterministic engineering and security gates.
- **Require humans** for irreversible or high-impact decisions.
- **Measure and recertify** continuously.

> The bank should not ask whether local agents are allowed. It should ask whether every local agent is **approved, bounded, observable, and revocable**.

---

## References

- [GitHub — Agent management for enterprises](https://docs.github.com/en/copilot/concepts/agents/enterprise-management)
- [GitHub — Preparing to use custom agents in your organization](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents)
- [GitHub — About custom agents](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/copilot-cli/about-custom-agents)
- [GitHub — MCP server usage in your company](https://docs.github.com/en/copilot/concepts/mcp-management)
- [GitHub — Configure MCP server access](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-server-access)
- [GitHub — MCP allowlist enforcement](https://docs.github.com/en/copilot/reference/mcp-allowlist-enforcement)
- [NIST — AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP — Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Repository — Agent, MCP, and Custom Agent Ecosystem](../agent-ecosystem.md)
- [Repository — MCP Catalog](../../mcp/README.md)
