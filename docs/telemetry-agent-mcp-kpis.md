# Telemetry and KPI Design for Automated Agents and MCP Utilization

**Repository:** `whsalazar-org/banco-chile-demo`  
**Status:** Design proposal  
**Audience:** Product, platform, SRE, security, and engineering teams

## 1. Purpose

This document defines a telemetry model and KPI framework for measuring:

- Utilization of automated agents.
- MCP server and tool usage.
- Agent efficiency, quality, reliability, and cost.
- User and business outcomes rather than activity alone.

The design is suitable for the current JavaScript/React demonstration and can be implemented behind a small telemetry adapter without coupling the UI to a specific observability vendor.

> [“An SLI is a service level indicator—a carefully defined quantitative measure.”](https://sre.google/sre-book/service-level-objectives/)

## 2. Design principles

1. **Measure outcomes first.** Agent activity is not success. The primary measures are completed user goals, correctness, safety, latency, and cost.
2. **Use traces for causality.** One user request should produce one trace containing agent steps, model calls, MCP calls, retries, approvals, and the final result.
3. **Use metrics for aggregation.** Counters, histograms, and gauges should answer operational questions without querying raw events.
4. **Use logs/events for auditability.** Record structured events for investigations, replay, quality analysis, and compliance.
5. **Preserve privacy.** Do not emit prompts, tokens, account numbers, credentials, connection strings, or tool payloads by default. Use redaction, hashing, sampling, and access controls.
6. **Control cardinality.** Use bounded dimensions such as `agent_name`, `agent_version`, `environment`, `mcp_server`, `tool_name`, `outcome`, and `error_type`.
7. **Connect metrics to traces.** OpenTelemetry exemplars can associate metric values with trace context, enabling drill-down from a KPI to a representative execution.

## 3. Measurement model

### 3.1 Entity hierarchy

```text
User session
└── Agent run / trace
    ├── Planning step
    ├── Model invocation
    ├── MCP tool call
    │   ├── Request
    │   ├── Authorization / approval
    │   └── Result or error
    ├── Validation / recovery step
    └── Final response
```

### 3.2 Required identifiers

| Identifier | Purpose |
|---|---|
| `trace_id` | Correlates one end-to-end agent run |
| `span_id` | Identifies one operation within a trace |
| `session_id` | Groups related user interactions |
| `agent_run_id` | Stable business identifier for an agent execution |
| `agent_name` / `agent_version` | Supports rollout and regression analysis |
| `mcp_server` / `tool_name` | Identifies the external capability used |
| `policy_decision_id` | Correlates authorization, approval, or denial |

Never use raw user identifiers as metric labels. Prefer a privacy-reviewed pseudonymous identifier in logs only.

## 4. Telemetry signals

### 4.1 Traces

Create spans for:

- `agent.run`
- `agent.plan`
- `model.invoke`
- `mcp.tool.call`
- `mcp.tool.approval`
- `agent.validation`
- `agent.retry`
- `agent.handoff`
- `agent.finalize`

Recommended span attributes:

```text
agent.name
agent.version
agent.mode                  # interactive, background, scheduled
agent.goal_type
agent.step_index
agent.step_count
model.provider
model.name
model.requested_output_tokens
model.actual_input_tokens   # only if safely available
model.actual_output_tokens  # only if safely available
mcp.server
mcp.tool
mcp.transport
mcp.operation
mcp.approval_required
mcp.approval_result
outcome                     # success, failure, timeout, denied, cancelled
error.type
retry.count
```

Do not store full prompts, full model responses, or MCP arguments in spans by default. If debugging requires payload capture, use explicit opt-in sampling with redaction and short retention.

### 4.2 Metrics

Use OpenTelemetry-compatible counters, histograms, and gauges. Histograms are preferred for latency, token, and cost distributions because averages can hide tail behavior.

| Metric | Type | Suggested dimensions |
|---|---|---|
| `agent_runs_total` | Counter | agent, version, mode, outcome |
| `agent_run_duration_ms` | Histogram | agent, version, outcome |
| `agent_active_runs` | Gauge | agent, environment |
| `agent_success_total` | Counter | agent, goal_type, success_type |
| `agent_user_corrections_total` | Counter | agent, correction_type |
| `agent_escalations_total` | Counter | agent, reason |
| `agent_steps_total` | Counter | agent, step_type |
| `agent_retries_total` | Counter | agent, retry_reason |
| `mcp_calls_total` | Counter | server, tool, outcome |
| `mcp_call_duration_ms` | Histogram | server, tool, outcome |
| `mcp_timeouts_total` | Counter | server, tool |
| `mcp_denials_total` | Counter | server, tool, policy |
| `mcp_result_validation_failures_total` | Counter | server, tool, validation_type |
| `model_invocations_total` | Counter | model, provider, outcome |
| `model_tokens_total` | Counter | model, provider, token_type |
| `agent_estimated_cost_usd` | Counter | agent, model, mcp_server |
| `agent_quality_score` | Histogram | agent, evaluator, score_band |

### 4.3 Structured events

Emit structured events for important state transitions:

```json
{
  "event_name": "mcp.tool.completed",
  "event_version": 1,
  "timestamp": "2026-08-05T00:00:00Z",
  "trace_id": "redacted-or-generated-id",
  "agent_name": "account-assistant",
  "agent_version": "1.3.0",
  "mcp_server": "customer-data",
  "tool_name": "get_account_summary",
  "duration_ms": 184,
  "outcome": "success",
  "result_size_bytes": 420,
  "redaction_applied": true
}
```

Events must be versioned. Consumers should tolerate additional fields and preserve unknown fields when forwarding.

## 5. KPI framework

### 5.1 Utilization KPIs

| KPI | Formula | Interpretation |
|---|---|---|
| **Active agent users** | Distinct active users per period | Adoption and reach |
| **Agent runs** | Count of started runs | Demand volume |
| **Run completion rate** | Completed runs / started runs | Basic reliability |
| **Repeat utilization** | Users with 2+ runs / active users | Habit formation |
| **Capability utilization** | Runs using capability / total runs | Which tools are valuable |
| **Peak concurrency** | Maximum simultaneous runs | Capacity planning |
| **Human deflection rate** | Eligible goals completed without human handoff / eligible goals | Automation coverage |

Utilization must be segmented by `goal_type`, user journey, and environment. A high call count with low completion is not healthy utilization.

### 5.2 MCP call KPIs

| KPI | Formula | Interpretation |
|---|---|---|
| **Calls per run** | MCP calls / agent runs | Tool dependence and plan efficiency |
| **Unique tools per run** | Distinct tools / run | Workflow breadth |
| **Tool success rate** | Successful calls / total calls | MCP reliability |
| **Tool timeout rate** | Timed-out calls / total calls | Dependency or timeout problems |
| **Tool denial rate** | Policy-denied calls / attempted calls | Safety and authorization friction |
| **Retry amplification** | Total calls including retries / initial calls | Waste caused by retries |
| **Useful call ratio** | Calls contributing to a validated result / total calls | Tool effectiveness |
| **MCP latency contribution** | MCP duration / end-to-end run duration | Dependency impact |
| **Result validation failure rate** | Invalid results / completed calls | Contract and data-quality problems |

The MCP specification defines tools as capabilities that models can invoke against external systems; therefore, tool-call telemetry should distinguish requested, authorized, executed, and validated states rather than recording only a network request.

### 5.3 Agent efficiency KPIs

| KPI | Formula | Interpretation |
|---|---|---|
| **Goal success rate** | Runs meeting acceptance criteria / eligible runs | Primary effectiveness measure |
| **First-pass success** | Successful runs without retry, correction, or handoff / successful runs | Planning and execution quality |
| **Steps per successful goal** | Agent steps / successful goals | Reasoning efficiency |
| **Tokens per successful goal** | Tokens / successful goals | Model efficiency |
| **Cost per successful goal** | Total estimated cost / successful goals | Economic efficiency |
| **Time to useful result** | Time until first validated useful output | User-perceived speed |
| **End-to-end p95 latency** | 95th percentile run duration | Tail user experience |
| **Recovery rate** | Recovered failures / recoverable failures | Resilience |
| **Human handoff rate** | Handoffs / started runs | Automation limitations |
| **User correction rate** | Runs requiring user correction / completed runs | Quality gap |
| **Safety intervention rate** | Blocked or escalated risky actions / risky attempts | Control effectiveness |

A lower number of steps is not automatically better. Optimize for **cost and latency per successful goal**, while ensuring correctness and safety remain above their SLOs.

## 6. Recommended SLOs and alert thresholds

Initial targets should be treated as hypotheses and recalibrated after baseline data is available.

| SLO / alert | Initial target |
|---|---:|
| Agent run completion rate | ≥ 99% |
| Goal success rate | ≥ 95% for stable goal types |
| End-to-end latency | p95 ≤ 10 seconds for interactive flows |
| MCP tool success rate | ≥ 99% excluding policy denials |
| MCP timeout rate | ≤ 1% |
| First-pass success | ≥ 80% |
| Human handoff rate | ≤ 15% for eligible flows |
| User correction rate | ≤ 10% |
| Unredacted sensitive-data events | 0 |

Use separate objectives for interactive, batch, and high-risk workflows. Track error budgets for reliability SLOs; do not make an availability target the only measure of agent quality.

## 7. Dashboard design

### Executive dashboard

- Active users and weekly repeat utilization.
- Goal success rate and user correction rate.
- Human deflection rate.
- Cost per successful goal.
- p95 time to useful result.
- Safety interventions and unresolved incidents.

### Operations dashboard

- Run volume and concurrency.
- Run completion and failure rates.
- p50/p95/p99 agent latency.
- MCP calls by server/tool.
- MCP error, timeout, denial, and retry rates.
- Model token and estimated cost trends.
- Top error types and affected agent versions.

### Investigation view

- Trace waterfall for one `agent_run_id`.
- Agent version and deployment cohort.
- Tool-call sequence and policy decisions.
- Retry and fallback chain.
- Validation results.
- Links from metric exemplars to representative traces.

## 8. Instrumentation contract for the React demo

Add a small provider-neutral interface, for example:

```javascript
export function createAgentTelemetry(transport) {
  return {
    startRun(context) {
      return transport.startSpan('agent.run', context);
    },
    recordMcpCall(event) {
      transport.increment('mcp_calls_total', {
        server: event.server,
        tool: event.tool,
        outcome: event.outcome,
      });
    },
    recordOutcome(event) {
      transport.increment('agent_success_total', {
        agent: event.agent,
        goalType: event.goalType,
        successType: event.successType,
      });
    },
  };
}
```

The production adapter can later export OpenTelemetry data. The demo adapter should write only sanitized events to the console or an in-memory collector. Never send secrets, credentials, connection strings, full account data, or unrestricted tool payloads from the browser.

## 9. Data governance and security

- Classify prompts, outputs, tool arguments, and results before collection.
- Default to metadata-only telemetry.
- Redact payment, identity, authentication, and account data.
- Hash or tokenize identifiers where correlation is needed.
- Encrypt telemetry in transit and at rest.
- Restrict raw traces to approved operators.
- Define retention by signal: short retention for payload-bearing debug traces and longer retention for aggregated KPIs.
- Audit access to sensitive telemetry.
- Include `redaction_applied`, `sampling_rate`, and `data_classification` in event metadata.
- Treat tool authorization and denial events as security telemetry, not just application errors.

## 10. Implementation phases

### Phase 1: Baseline

1. Define goal types and acceptance criteria.
2. Add `trace_id`, `agent_run_id`, agent version, outcome, and duration.
3. Track run counts, completion rate, latency histograms, and MCP call counts.
4. Build the operations dashboard.

### Phase 2: Efficiency and quality

1. Add model token and cost accounting.
2. Add retries, fallbacks, validation failures, and human handoffs.
3. Add first-pass success, cost per successful goal, and user correction KPIs.
4. Link metrics to traces with exemplars.

### Phase 3: Governance and optimization

1. Add policy decision telemetry and safety KPIs.
2. Introduce sampling and retention controls.
3. Establish SLOs and error budgets by workflow class.
4. Run controlled experiments on prompts, models, tool selection, and orchestration strategies.

## 11. Operating review cadence

- **Daily:** reliability, latency, MCP failures, security alerts.
- **Weekly:** utilization, successful-goal cost, tool usefulness, regressions by version.
- **Monthly:** adoption, automation coverage, quality trends, SLO/error-budget review, and retention/access audits.

## 12. References

1. [OpenTelemetry Metrics Data Model](https://opentelemetry.io/docs/specs/otel/metrics/data-model/) — metrics, histograms, and exemplars.
2. [Model Context Protocol: Tools](https://modelcontextprotocol.io/specification/2024-11-05/server/tools) — tool discovery, invocation, results, and errors.
3. [Google SRE: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) — SLIs, SLOs, percentiles, correctness, and error budgets.
4. [Google SRE: Service Best Practices](https://sre.google/sre-book/service-best-practices/) — user-centered measurement and monitoring outputs.
5. [Google SRE: Cascading Failures](https://sre.google/sre-book/addressing-cascading-failures/) — tail latency, deadlines, retries, and resource exhaustion.

> The central KPI is not “how many times did the agent act?” It is “how reliably, safely, quickly, and economically did the agent complete a valuable user goal?”
