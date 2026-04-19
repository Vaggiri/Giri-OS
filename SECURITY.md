# Security Policy

## Supported Versions

Specifically focus on the latest stable versions of GisunOS:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously at the GisunOS project. If you believe you've found a security vulnerability in our codebase, please do not open a public issue. Instead, follow these steps:

1.  **Draft a detailed report**: Include reproduction steps, potential impact, and suggested fixes.
2.  **Contact us privately**: Send an email to [security-reports@gisunos.dev] (or open a private security advisory on GitHub if available).
3.  **Wait for a response**: We aim to respond within 48 hours to confirm receipt and discuss next steps.

We follow a coordinated disclosure policy. We will work with you to fix the vulnerability and will credit you for your discovery in the next release.

## System Protection Overview

GisunOS includes several built-in security features:
*   **Virtual Firewall**: Intercepts and validates all outgoing requests from applications.
*   **Isolated Storage**: Uses Supabase with Row Level Security (RLS) to ensure data privacy.
*   **Permission System**: Applications must request permissions for sensitive operations (notifications, audio, etc.).

For more details on our security architecture, check [docs/security.md](docs/security.md).
