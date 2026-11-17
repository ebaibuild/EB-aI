# Architecture and engineering approach

## Implemented today

The repository uses **vanilla HTML/CSS/JavaScript** with a small dependency-free state engine:

```text
index.html
  ├─ src/styles.css           responsive public UI
  ├─ src/app.js               browser-local task board
  └─ src/workflow.mjs          pure validated task transitions
server.mjs                    local static server, no accounts
scripts/security-check.mjs    heuristic credential-pattern guard
```

The browser handles task interactions. `workflow.mjs` performs validation, state transitions and JSON serialization. No external tool execution, authentication, background agents, or remote persistence is implemented.

## Principles for future investigation

1. **Verifiable completion:** never equate model output with a completed real-world action.
2. **Least privilege:** ask for explicit approval before accessing files, browsers or accounts.
3. **Permission boundaries:** keep connectors and model adapters separated from orchestration logic.
4. **Local-first when possible:** don't send private information to a remote service by default.
5. **Failure transparency:** expose errors and partial results clearly.
6. **Accessibility:** useful keyboard interaction, understandable states, and low-complexity interfaces.
7. **Truthful project status:** distinguish working implementation from prototypes and proposals.

## Proposed long-term components (not built here)

```text
Interaction layer (text / voice / web / native client)
       ↓
Task planner (explicit user approval, status tracking)
       ↓
Capability registry → tool adapters and optional model adapters
       ↓
Action verification, logs and accountable results
```

This diagram describes a design direction, not currently functioning infrastructure.

## Threat boundaries

A production assistant must not silently access third-party accounts or desktop resources. Keys and refresh tokens should be stored outside source control and handled using platform-appropriate credential storage. Any public deployment would require proper authentication, rate limits, privacy controls, audits, and a documented data retention policy. None of those are implied to exist in this initial public package.
