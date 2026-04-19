# Security Policy

We are committed to making **GisunOS** a secure and private workstation for the web.

## Supported Versions

Currently, we only provide security patches for the main production branch.

| Version | Supported          |
| ------- | ------------------ |
| v1.1.x  | :white_check_mark: |
| v1.0.x  | :white_check_mark: |
| < v1.0  | :x:                |

## Reporting a Vulnerability

**Please do not open public issues for security vulnerabilities.**

If you discover a potential security flaw in GisunOS (especially in the **GisunBridge** proxy or **Supabase** RLS policies), please report it responsibly:

1.  **Draft a detailed report**: Include reproduction steps, potential impact, and suggested fixes.
2.  **Contact us privately**: Open a [GitHub Private Security Advisory](https://github.com/Vaggiri/Giri-OS/security/advisories/new) (preferred) or send a direct message to the maintainers.
3.  **Hacking Policy**: We allow research on your own local environment. Please do not attempt to hack the live production demo or other users' data.

## Built-in Protections

GisunOS is built with security-first architecture:

- **GisunBridge Isolation**: Our absolute proxy bridge is designed to scrub malicious tags and prevent cross-origin script injection.
- **Vering Logic**: All outgoing API requests are intercepted by a custom firewall.
- **Stateless API**: Our serverless backend (Vercel API) minimizes the attack surface.
- **Row Level Security**: We use Supabase RLS to ensure that users can only access their own files and media.

---
*Thank you for helping us keep the GisunOS community safe.*
