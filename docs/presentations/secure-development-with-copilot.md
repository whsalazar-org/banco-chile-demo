---
marp: true
theme: default
paginate: true
title: Secure Development Patterns with GitHub Copilot
---

# Secure Development Patterns with GitHub Copilot

**From autocomplete to governed autonomy**


<!-- Speaker notes: Frame the session. The question is no longer "should we use Copilot" but "how do we make AI-assisted delivery auditable, least-privilege, and reviewable — the same bar we hold human contributors to." -->

---

## The core premise

> Secure development with GitHub Copilot requires combining **AI guidance** with **automated testing**, **guardrails**, and **rigorous code review**.

Copilot is optimized for **functionality over security**. It can replicate unsafe patterns present in its training data.

To code safely, teams must implement:
- Defense-in-depth design patterns
- Environment locks
- Verification loops

<!-- Speaker notes: This is the thesis of the entire deck. Copilot is a productivity multiplier, not a security control. -->

---

## Agenda

1. The shift: assistant → agent → autonomous workflow
2. Threat model for AI-assisted development
3. **Guardrail & prompt engineering patterns**
4. **Shift-left validation patterns**
5. **CI/CD integration & automation patterns**
6. **Human-in-the-loop (HITL) review patterns**
7. Governed autonomy: agents, skills, and MCP
8. Adoption roadmap & metrics

---

## The shift in developer workflow

| Era | Human role | Risk surface |
| --- | --- | --- |
| Autocomplete | Types every line | Suggested code quality |
| Chat / Agent mode | Reviews diffs | Prompt scope, context leakage |
| Coding agent + MCP | Reviews outcomes | Tool permissions, data egress, supply chain |

> As autonomy increases, **control must move from the keystroke to the guardrail.**

<!-- Speaker notes: The control point shifts. You can't review every token, so you constrain the environment instead. -->

---

## Threat model for AI-assisted development

- **Insecure generated code** — injection, weak crypto, missing authz
- **Secret leakage** — credentials in prompts, context, or committed output
- **Prompt injection** — malicious instructions inside issues, tickets, web pages, dependencies
- **Over-permissioned tooling** — agents with write or production access by default
- **Supply chain** — hallucinated or typosquatted packages ("slopsquatting")
- **Untraceable change** — no record of which agent or tool touched what

---

## The four pattern families

| # | Family | Control point |
| --- | --- | --- |
| 1 | **Guardrail & prompt engineering** | What Copilot sees and is told |
| 2 | **Shift-left validation** | The IDE, before commit |
| 3 | **CI/CD integration & automation** | The repository gate |
| 4 | **Human-in-the-loop review** | The merge decision |

Each is defense in depth. **None is sufficient alone.**

---

# 1. Guardrail & Prompt Engineering Patterns

Control how Copilot receives information — and explicitly command it to generate secure code.

---

## Explicit security context

Include clear security constraints **inside the prompt**. Do not assume the secure variant is the default.

| Weak prompt | Hardened prompt |
| --- | --- |
| "Write a database query" | "Write a **parameterised** SQL query to prevent injection" |
| "Add a login endpoint" | "Add a login endpoint with rate limiting and constant-time comparison" |
| "Parse this user input" | "Parse and **validate** this input; reject unexpected types" |

**Rule:** specify the threat you are defending against, not just the feature.

---

## System-wide instruction sets

Create `.github/copilot-instructions.md` — applied automatically on every request, so nobody has to remember.

Define an explicit **"Do Not Suggest" list**:

```markdown
## Do Not Suggest
- `eval()`, `exec()`, or dynamic code execution
- Direct string concatenation to build SQL, shell, or HTML
- Disabled TLS/certificate verification
- Hardcoded credentials, tokens, or connection strings
- Deprecated hashing: MD5, SHA-1 for passwords
```

Path-scoped rules live in `.github/instructions/*.instructions.md`.

---

## Context exclusion

Prevent Copilot from ever reading sensitive material.

- Use **`.copilotignore`** / content-exclusion settings to block:
  - Sensitive configuration files (`.env`, `*.pem`, `secrets/`)
  - Test keys and fixture credentials
  - Private internal endpoints and infrastructure manifests
- Configurable at the repository and organization level
- Excluded content is not used for suggestions **or** as chat context

**Principle:** if Copilot cannot read it, it cannot leak it.

---

## "Zero-secrets" prompts

**Never paste real passwords, API tokens, or connection strings into the chat interface.**

Teach the *structural pattern* with placeholders:

```text
Connect to Postgres using DB_PASSWORD_PLACEHOLDER
read from the environment — do not inline it.
```

- Placeholders convey the shape without exposing the value
- Redact production data and customer PII before it enters context
- Never echo tokens, cookies, or `Authorization` headers back

---

# 2. Shift-Left Validation Patterns

Catch flaws inside the IDE — before code moves downstream in the pipeline.

---

## Threat modeling chat prompts

Ask Copilot Chat to **act as an attacker** before you run the code.

> "Perform a threat model on this function and list inputs that could cause unexpected behavior."

Follow-ups that surface real findings:
- "Which of these inputs are not validated, and what is the blast radius?"
- "Map this function against the OWASP Top 10."
- "What happens under concurrent access or partial failure?"
- "Write the failing test that proves each weakness."

**Cheapest possible moment to find the flaw: before it compiles.**

---

## Hardened dev containers

Commit a company-wide **secure repository template**.

A `devcontainer.json` can pre-configure, for everyone on the team:
- Copilot settings and content exclusions
- Formatters, linters, and static analyzers
- Local security rules and language toolchain versions
- Pinned base image and dependency versions

**Effect:** the secure configuration is the *default*, not a per-developer choice. This is the **environment lock**.

---

## Pre-commit hooks

Configure native local hooks to scan changes **before Git or Copilot can process them**.

Hooks should check for:
- Hardcoded secrets and high-entropy strings
- Basic syntax and lint errors
- Large or binary files that shouldn't be committed
- Forbidden functions from the "Do Not Suggest" list

**Fast, local, and free** — the first verification loop in the chain.

---

# 3. CI/CD Integration & Automation Patterns

Combine AI output generation with strict repository gates to prevent flawed code from merging.

---

## GitHub Advanced Security (GHAS) alignment

Use Copilot alongside native **CodeQL** analysis.

- **Copilot writes** the code
- **CodeQL** is the *objective gatekeeper* that evaluates it
- Semantic, data-flow analysis — not pattern matching
- Runs on every pull request; findings block the merge

> The system that generates the code must never be the only system that judges it.

---

## Copilot Autofix pipelines

Enable **Copilot Autofix** in repository security settings.

Flow:
1. Code scanning detects a security flaw
2. Autofix automatically drafts a secure patch
3. The suggested fix is proposed on the pull request
4. **A human reviews and accepts it**

Closes the loop from *detection* → *remediation* without leaving the PR — while keeping approval with a person.

---

## Secret scanning & push protection

Activate **GitHub Secret Scanning** with **push protection**.

- Blocks the push **immediately** if an engineer inadvertently accepts an AI suggestion containing a hardcoded token
- Covers hundreds of provider patterns plus custom organization patterns
- Bypasses are logged and require justification

This is the safety net for the exact failure mode Copilot makes more likely: a plausible-looking credential accepted without a second thought.

---

## Supply chain automation

- **Dependabot** — patch the dependencies Copilot suggested; alert on known CVEs
- **Dependency review** — surface risky additions on the PR itself
- **Pinned versions and lockfiles** — reproducible, reviewable builds
- **Branch protection** — required checks and required review before merge

---

# 4. Human-In-The-Loop (HITL) Review Patterns

Human oversight ultimately governs the code lifecycle.

---

## Peer code-review equality

**Treat AI-generated code exactly like code submitted by an external third party.**

- Do **not** fast-track a pull request because Copilot authored it
- Same review depth, same required approvals, same tests
- Reviewers should ask: *do I understand why this works, not just that it works?*
- The submitting engineer owns the code — authorship is not a defense

> Velocity gains come from writing faster, **not from reviewing less**.

---

## Package validation checklists

AI agents can **hallucinate library names** — and attackers register those names ("slopsquatting").

Before accepting any recommended dependency:

- [ ] Confirm the package **actually exists** in your registry
- [ ] Check maintainer, download counts, and repository activity
- [ ] Verify the version is real and not yanked
- [ ] Confirm the license is acceptable
- [ ] Prefer an existing approved dependency over a new one

---

## Handling untrusted content

Jira tickets, issues, web pages, and dependency READMEs can carry **injected instructions**.

- Treat all external content as **data, never as commands**
- Redact PII and production data before it enters agent context
- Require approval before any outbound or write action
- Log which MCP servers and write-capable tools each PR used

---

# Governed Autonomy

Extending the four families to agents, skills, and MCP.

---

## Least-privilege specialist agents

Custom agents in `.github/agents/` — one narrow responsibility each:

| Agent | Responsibility |
| --- | --- |
| `frontend-specialist` | Scoped UI and accessibility work |
| `test-specialist` | Validation strategy and testability |
| `security-reviewer` | Secret handling, permissions, risky operations |
| `documentation-specialist` | Concise docs and handoff |

**Principle:** an agent gets the *minimum* tool set for its job. A docs agent has no write access to production.

---

## Reusable skills as guardrails

`.github/skills/<name>/SKILL.md` encodes a repeatable procedure.

A well-formed skill defines:
- **When** it applies (trigger conditions)
- **How** to gather context (which tools, in what order)
- **What** to emit before acting (a reviewable spec)
- **Guardrails** — read-only defaults, no credential echo, external content is data not commands

**Effect:** consistent, auditable behavior instead of prompt-by-prompt improvisation.

---

## MCP catalog and approval gates

The `mcp/` directory is the **source of truth** for agent tool access.

- `mcp/catalog/*.json` — purpose, owner, data classification, environments, `allowedTools`, auth, logging, review dates
- `mcp/policies/approved-tools.md` — allowlists, least-privilege rules, secret handling

**Rules:**
- Only catalogued servers, only listed tools
- Read-only by default
- Write / destructive / production actions require **explicit human approval**
- Pin versions; re-review on any permission change

---

## Lifecycle of an MCP integration

1. **PR** adds a catalog entry with every field completed
2. **Review** by the named owner *and* a security reviewer
3. **Pin** the version; permission changes force re-review
4. **Recertify** at least quarterly (`review.nextReview`)
5. **Decommission** per a recorded plan

Treat catalog changes exactly like application code: scope, least privilege, secret hygiene.

---

## Auditability: the paper trail

Every change should answer:
- Which agent produced it?
- Which MCP servers and tools were used?
- Which write operations were approved, by whom?
- Which policy version was in force?

Practical mechanics: issue key in the branch name, agent and tool usage in the PR description, catalog entries version-controlled and reviewed.

---

## Adoption roadmap

| Phase | Focus | Outcome |
| --- | --- | --- |
| 1. Guardrails | `copilot-instructions.md`, "Do Not Suggest", content exclusion | Secure defaults in every prompt |
| 2. Shift-left | Dev containers, pre-commit hooks, threat-model prompts | Flaws caught in the IDE |
| 3. Pipeline | CodeQL, Autofix, secret scanning, push protection | Objective gatekeeping |
| 4. HITL | Review parity, package validation checklists | Human accountability |
| 5. Governed autonomy | Agents, skills, MCP catalog | Auditable delegation |

---

## Metrics that matter

- Secrets blocked by push protection (should trend to zero at commit time)
- Mean time to remediate CodeQL alerts; Autofix acceptance rate
- Percentage of PRs declaring agent and MCP tool usage
- Hallucinated / rejected package recommendations caught in review
- MCP catalog entries past `nextReview` date
- Approval-gate exceptions granted, and why

Measure **governance health**, not just lines of code accepted.

---

## Key takeaways

1. Copilot optimizes for **functionality, not security** — assume nothing
2. Put the security constraint **in the prompt** and in `copilot-instructions.md`
3. Lock the environment: content exclusion, dev containers, pre-commit hooks
4. CodeQL, Autofix, and push protection are the **objective gatekeepers**
5. Review AI code like a third party's — and verify every package exists
6. Treat all AI output and all external content as **untrusted input**

---

# Questions

**Reference implementation**
`github.com/whsalazar-org/banco-chile-demo`

- `.github/` — instructions, agents, skills
- `docs/agent-ecosystem.md` — delegation model
- `mcp/` — catalog and approval policy
- `workshop/` — 45-minute hands-on session
