# Changelog

All notable changes to the **GisunOS** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-19

### 🚀 Added
- **Unified Full-Stack Deployment**: Standardized monorepo structure for Vercel with `/api` serverless backend.
- **Orientation Guardian**: Cinematic mobile orientation management to enforce landscape mode.
- **Compact UI Mode**: Adaptive UI scaling for mobile landscape, including Dock, Menu Bar, and Menu optimizations.
- **GisunBridge 2.0**: Absolute web proxy system with support for post-processing HTML and relative path resolving.
- **Desktop Shortcuts**: Draggable and persistent application shortcuts on the desktop.

### ✨ Improved
- **High-Performance Dragging**: GPU-accelerated window movement system optimized for touch and desktop.
- **System Metrics**: Redesigned Activity Monitor with cloud-compatible hardware information fallbacks.
- **App Configuration**: Dynamic API URL detection for seamless switching between local and production environments.

### 🛡️ Fixed
- **Vercel Payloads**: Resolved "No Output Directory" errors by correctly mapping `client/dist`.
- **Git Sync**: Resolved repository conflicts between local environments and GitHub remote heads.
- **Network Timeouts**: Optimized `.vercelignore` to prevent `ECONNRESET` during CLI deployments.

---
*GisunOS v1.0.0 marks the transition to a production-ready cloud-native workstation.*
