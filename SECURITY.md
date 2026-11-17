# Security policy

This repository currently contains a **local-only public website and task board**. It does not include live account integrations or an AI execution engine.

## Reporting

Please avoid posting sensitive vulnerability details publicly. Until a private maintainer reporting channel is established, do not submit account credentials, tokens, personal records, or exploit payloads through public issues. If the repository owner enables GitHub's private vulnerability reporting, use that channel.

## Repository safeguards

- No real API keys, access tokens, service-account files, OAuth client secrets or account data are included.
- The `.gitignore` excludes common credential filenames.
- `npm run check` performs unit tests and a heuristic secret-pattern scan.
- The local preview binds to `127.0.0.1` and applies restrictive response headers.
- The client does not load scripts, fonts, or tracking code from third-party domains.

Security scanners are imperfect; **manual review is still required** before every public push. When adding new integrations, use explicit user authorization, least privilege, and proper platform credential storage.
