# GitHub Project Maintainer Settings Guide

To maintain the security and authorship integrity of GisunOS, the following GitHub settings must be enforced by the repository administrators.

## 1. Branch Protection Rules
**Path**: `Settings > Branches > Branch protection rules > Add rule`

Rule for branch: `main`
*   [x] **Require a pull request before merging**: Prevents direct pushes to the production branch.
    *   [x] **Require approvals**: Set to at least 1 (Maintainer: Vaggiri).
*   [x] **Require signed commits**: Ensures every commit is cryptographically verified. **(MANDATORY for GisunOS)**
*   [x] **Require status checks to pass before merging**: If CI (GitHub Actions) is established.
*   [x] **Require signed commits**: Ensures every commit can be verified as coming from a known source.
*   [x] **Require linear history**: Encourages rebase/squash workflows to keep the history clean and readable.
*   [x] **Lock branch**: Prevents the branch from being deleted.

## 2. Code Ownership Enforcement
**Path**: Root of repository

Create a file named `CODEOWNERS` (case-sensitive) with the following content:

```text
# Global owners (Maintain the entire repo)
*       @Vaggiri

# Specialized area owners (optional)
/client/ @Vaggiri
/server/ @Vaggiri
/docs/   @Vaggiri
```

This ensures that GitHub automatically adds @Vaggiri as a reviewer for any PR affecting these files.

## 3. Pull Request Interaction
*   **Restrict Editing by Maintainers**: Ensure contributors allow maintainers to edit their PRs for quick fixes, but maintain the original contributor's commit ownership.
*   **Merge Button**: Default to **"Squash and merge"** for features to keep the `main` history concise, but **"Rebase and merge"** for minor fixes to preserve history.

## 4. Security & Analysis
**Path**: `Settings > Code security and analysis`

*   [x] **Dependency graph**: Enabled.
*   [x] **Dependabot alerts**: Enabled.
*   [x] **Dependabot security updates**: Enabled.
*   [x] **Secret scanning**: Enabled (Crucial for preventing Supabase key leaks).

## 5. Metadata & Socials
*   **Tags/Topics**: Use `web-os`, `javascript`, `high-performance`, `macos-inspired`, `gisunos`.
*   **License**: Ensure GitHub correctly identifies the license as **GPL-3.0**.
*   **README**: Pin the README so it's the first thing visitors see.

---
*Guide Version: 1.0.0*
*Last Reviewed: 2026-04-19*
