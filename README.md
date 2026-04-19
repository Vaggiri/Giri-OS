# GisunOS - High Performance Web-Based Operating System

![GisunOS Logo Placeholder](https://via.placeholder.com/800x200?text=GisunOS+Evolution)

> **Experience the future of the web as a workstation.**

GisunOS is a production-grade, high-performance web-based operating system designed with a macOS-inspired aesthetic and a core focus on speed, modularity, and privacy. Built entirely with vanilla web technologies, it provides a seamless desktop experience directly in the browser.

---

## 🚀 Key Features

*   **Premium Glassmorphism UI**: A stunning, high-performance desktop interface with dynamic blur and smooth animations.
*   **Virtual Window Manager**: Fully draggable, resizable, and stackable windowing system.
*   **Built-in Firewall**: Advanced security layer to monitor and control application network traffic.
*   **Ad-Free Music System**: A dedicated hub for high-quality audio playback without interruptions.
*   **Centralized SearchHub**: Quickly find applications, files, and web content from a unified interface.
*   **Developer Terminal**: A functional command-line interface for system interactions and automation.

---

## 🏗️ Architecture Overview

GisunOS follows a micro-kernel inspired architecture for the web:

1.  **Core Shell**: Handles window management, desktop state, and event routing.
2.  **Service Layer**: Independent modules for storage (Supabase), security (Firewall), and media.
3.  **App Engine**: A standardized interface for loading and running isolated web applications.

For a deeper dive, see our [Architecture Documentation](docs/architecture.md).

---

## 📦 Installation & Setup

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/Vaggiri/Gisun-OS.git
   cd Gisun-OS
   ```

2. Install dependencies for both client and server:
   ```bash
   # Install root scripts
   npm install

   # Setup Frontend
   cd client && npm install

   # Setup Backend
   cd ../server && npm install
   ```

3. Run the development environment:
   ```bash
   # From root
   npm run dev
   ```

---

## 📸 Screenshots

*(Screenshots coming soon! GisunOS is currently in active development.)*

---

## 🤝 Contributing

We welcome contributions! However, we maintain strict standards to ensure the integrity of the OS. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a Pull Request.

---

## 🛡️ Security

Security is foundational to GisunOS. If you discover a vulnerability, please refer to our [SECURITY.md](SECURITY.md) for reporting guidelines.

---

## 👤 Author

GisunOS is designed and built by **Vaggiri**.

*   **Original Creator**: [Vaggiri](https://github.com/Vaggiri)
*   **Primary Stewardship**: Vaggiri Open Source Lab

---

## ⚖️ License

GisunOS is licensed under the **GNU General Public License v3.0**. 

### Why GPL-3.0?
We use the GPL-3.0 to protect the authorship and the open nature of the project. It ensures that:
1.  Any software derived from GisunOS must also be open-source and licensed under GPL-3.0.
2.  Original attribution to **Vaggiri** must be maintained in all versions.
3.  Patents cannot be used to restrict the freedom of the software.

For full details, see the [LICENSE](LICENSE) file.
