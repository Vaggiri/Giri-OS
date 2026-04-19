# Contributing to GisunOS

First off, thank you for considering contributing to **GisunOS**! It's people like you that make this workstation-grade WebOS a reality.

> [!IMPORTANT]
> **Authorship Protection**: GisunOS is designed and built by **Vaggiri**. We maintain strict standards to ensure original attribution and authorship are preserved across all forks and derivatives.

---

## 🛠️ Global Development Setup

The workflow has been simplified into a unified monorepo:

1.  **Fork & Clone**:
    ```bash
    git clone https://github.com/Vaggiri/Giri-OS.git
    cd Giri-OS
    ```
2.  **Unified Install**:
    ```bash
    # Install root, api, and client dependencies in one go
    npm install
    cd client && npm install
    ```
3.  **Run Development Environment**:
    ```bash
    npm run dev
    ```

---

## 🚦 Contribution Workflow

Our process is designed to maintain high-quality results:

1.  **Check for Issues**: Always check if your bug or feature idea is already being discussed.
2.  **Use Templates**: We provide professional **Issue Templates** for [Bug Reports](https://github.com/Vaggiri/Giri-OS/issues/new?template=bug-report.md) and [Feature Requests](https://github.com/Vaggiri/Giri-OS/issues/new?template=feature-request.md). Please use them!
3.  **Signed Commits**: We strictly require **GPG-signed commits**. Commits without the "Verified" badge on GitHub will not be merged.
4.  **License Compliance**: All work must be compatible with the **GPL-3.0** license.

---

## 🎨 Creative Standards (The "Flex" Guide)

To maintain the premium GisunOS aesthetic, your UI contributions should follow these rules:

- **Glassmorphism Preferred**: Use `backdrop-blur-3xl`, `bg-white/5`, and subtle borders.
- **Spring Animations**: Use Framer Motion `stiffness: 450, damping: 35` for all window/dock interactions.
- **Tailwind Atomic Design**: Avoid arbitrary values; use our CSS variables defined in `index.css`.
- **Iconography**: Use [Lucide React](https://lucide.dev/) for all system icons.

---

## ✅ Pull Request Requirements
When you open a PR, our **Pull Request Template** will automatically guide you. Ensure you include:
- A clear description of the problem solved.
- **Screenshots** or **Screen Recordings** (essential for UI changes!).
- Verification that you've tested on both **Desktop** and **Mobile Landscape**.

---
*Thank you for helping us build the ultimate Web Workstation!*
