# Exercise 4 (8 min): MCP policy and approval-gate decisions

## Objective
Use MCP catalog/policy documents to decide what is allowed, what is read-only, and what needs approval.

## Do this
1. Review:
   - `/mcp/README.md`
   - `/mcp/policies/approved-tools.md`
2. In notes, classify these actions:
   - Read repository metadata
   - Modify repository content
   - Query production-like data
   - Trigger destructive operation
3. For each action, state:
   - Allowed by default? (yes/no)
   - Requires human approval? (yes/no)
   - Why, based on policy language

## Expected outcome
You can justify MCP/tool decisions using repository policy as source of truth.

## Acceptance criteria
- [ ] Classification table/list is complete.
- [ ] Decisions cite least privilege and read-only defaults.
- [ ] Approval gates are correctly identified for risky actions.

## Reflection checkpoint
What could go wrong if an agent skips this gate-checking step?
