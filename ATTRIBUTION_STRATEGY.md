# Authorship & Attribution Protection Strategy

Maintaining clear and legally defensible proof of ownership is critical for the **GisunOS** project. This document outlines the technical and legal methods used to enforce attribution to the original creator, **Vaggiri**.

## 1. Legal Enforcement: GPL-3.0 copyleft
The project is licensed under the GPL-3.0 precisely because it is a "copyleft" license. This means:
*   **Viral Nature**: Any derivative work *must* be open-source and licensed under the same terms.
*   **Notice Preservation**: It is a legal violation of the license to remove copyright notices from the source code.
*   **Attribution Requirement**: Anyone redistributing the software must provide credit to the original author.

## 2. Technical Enforcement: Source File Headers
Every `.js`, `.jsx`, `.css`, and `.html` file in the repository contains a mandatory license header. 
*   **Mechanism**: CI/CD checks (GitHub Actions) can be configured to fail if any file is submitted without the standard header.
*   **Action**: Use the provided `HEADER_TEMPLATE.txt` for all new files.

## 3. Technical Enforcement: Cryptographic Proof (GPG)
Every commit to the GisunOS repository must be GPG-signed.
*   **Proof of Identity**: GPG signing links every line of code to a verified cryptographic key owned by Vaggiri.
*   **GitHub Verification**: This grants the "Verified" badge, providing public, immutable proof that the code has not been tampered with and was indeed committed by the author.
*   **Setup**: Follow the [GPG Signing Guide](docs/gpg_signing.md) for local configuration.

## 4. Git History as Proof of Authorship
The Git commit history serves as an immutable, timestamped record of the project's evolution.
*   **Commits**: The initial commit containing the core architecture is the primary proof of creation.
*   **Email Verification**: All core commits are signed using GPG or linked to Vaggiri's verified GitHub account.
*   **Authors File**: The `AUTHORS` file serves as a high-level summary of ownership that is checked into the main branch.

## 5. UI-Level Attribution
GisunOS includes non-intrusive but permanent branding in the following locations:
*   **Boot Sequence**: The "Gisun" logo and "Designed by Vaggiri" text appear during every system start.
*   **About This OS**: A dedicated system application that displays the version, license, and primary author details.
*   **System Logs**: The initial system log entry on every boot records the author metadata.

## 6. Mitigation of Attribution Removal
If a fork or derivative work is found to have removed author credit:
1.  **Cease and Desist**: A formal request will be sent to the repository host (e.g., GitHub) citing a GPL-3.0 license violation.
2.  **DMCA Takedown**: If the credit removal persists, a DMCA request will be filed to remove the infringing content.
3.  **Public Notice**: The project will maintain a "License Compliance" list of compliant and non-compliant mirrors.

## 7. Third-Party Compliance
While protecting our own authorship, we also strictly adhere to the copyrights of others. For details on how we handle third-party media and APIs, see the [Legal Notice & Fair Use Policy](LEGAL_NOTICE.md).

---
*Strategy Document Version: 1.1.0*
*Authorized by: Vaggiri*
