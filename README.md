<div align="center">

# E.B AI
### Intelligence, put to work.

**An early-stage, open-source exploration of accessible and trustworthy AI automation.**

[Project site](./index.html) · [Roadmap](./ROADMAP.md) · [Architecture](./docs/ARCHITECTURE.md) · [Contributing](./CONTRIBUTING.md) · [Security](./SECURITY.md)

</div>

---

## Why E.B AI?

Modern AI can describe workflows, but useful assistance demands more: meaningful tool boundaries, permissioned actions, clear progress, failures that are surfaced rather than hidden, and verifiable outcomes. E.B AI explores what it would take to make that experience understandable and accessible.

We are **not** claiming thousands of current users, download counts, working agent integrations, or a completed autonomous desktop assistant. This repository is a public foundation for the project and a useful local-only prototype.

## What works today

- A responsive, accessible project website with a clear mission and roadmap.
- A **working browser-local workflow board**: add tasks, change status, delete tasks, monitor progress, and export the board as JSON.
- Local browser persistence using `localStorage` (no server storage).
- Unit tests for the workflow state engine and a simple secret-pattern scanning script.
- A minimal server with a restrictive Content Security Policy and no external network requests.
- No third-party dependencies at runtime; no API keys or account connections.

The workflow board is **not an AI agent** and does **not perform external actions**. Statuses are set by the user. That distinction is intentional.

## Quick start

Requires **Node.js 20+**. No installation of packages or secrets required.

```bash
npm start
```

Then open **http://127.0.0.1:4173** in your browser.

```bash
npm test       # Unit tests
npm run check  # Unit tests + credential-pattern scan
```

> You can explore the source without using any cloud service or creating any accounts.

## Project directions

| Area | Current state |
|---|---|
| Public project page | Implemented |
| Browser-local workflow board | Implemented |
| Local/cloud AI adapters | Research / planned |
| Permissioned tool execution | Planned |
| Voice interaction | Planned |
| macOS desktop assistant | Separate experimental direction; not included here |
| Public deployment and broader contributions | Future goal |

See [ROADMAP.md](./ROADMAP.md) for proposed milestones and [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for guiding principles.

## Security and privacy

- **No credentials, API keys, tokens, access secrets, private datasets, or access to personal systems are included.**
- This project makes no network requests to AI vendors or third-party services.
- The workflow board stores task titles in **the browser's local storage**. Don't enter secrets or sensitive personal information into task titles. Clear your browser storage to erase them.
- If you discover a vulnerability, see [SECURITY.md](./SECURITY.md).
- Before publishing future code, run `npm run check` and review every change for secrets. Automated checks cannot guarantee that every secret is detected.

## How to contribute

The project is early-stage. Issues, accessible UI improvements, tests, documentation, and thoughtful design proposals are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE). This repo is independent and not endorsed by any model provider or platform.
