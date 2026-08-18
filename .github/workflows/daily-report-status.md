---
emoji: 📊
description: Generate a daily activity report in a new issue.
on:
  schedule: daily
  workflow_dispatch:
permissions:
  contents: read
  issues: read
  pull-requests: read
  copilot-requests: write
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
safe-outputs:
  create-issue:
---

# Daily Report Status

## Task

Generate a activity report in a new issue.

Summarize repository activity over the last 24 hours (ending at run start, UTC),
including opened/closed issues and pull requests, merged changes, and notable
discussions. Read data via `gh` commands.

## Safe Outputs

- Publish the report using the `create-issue` safe output with a clear title and a
  meaningful markdown body.
- Call `noop` with a short explanation when there is no qualifying activity in the window.
