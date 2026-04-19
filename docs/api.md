# GisunOS API & Modules

This document outlines the internal modules and communication interfaces available to GisunOS applications and system services.

## Core Message Bus (`GisunOS.API`)

All applications interact with the system through the global `GisunOS` object.

### `GisunOS.launchApp(appConfig)`
Launches a new application window.
*   `appConfig.id`: Unique application identifier.
*   `appConfig.title`: Display name for the window.
*   `appConfig.component`: The React/Vanilla component to render.
*   `appConfig.width/height`: Initial dimensions.

### `GisunOS.notify(message, type)`
Triggers a system-level notification.
*   `type`: `'info'`, `'warning'`, `'error'`, `'success'`.

### `GisunOS.firewall.request(url, options)`
The secure wrapper for `fetch`. Apps are encouraged (and in some cases mandated) to use this instead of native `fetch`.
*   Includes origin validation.
*   Checks user-defined firewall rules.

## Storage Services

### `GisunOS.storage.save(path, data)`
Saves data to either local storage or Supabase cloud, depending on user settings and network availability.

### `GisunOS.storage.read(path)`
Retrieves data from the unified storage layer.

## UI Components (OS Design System)

GisunOS provides a set of pre-styled components to maintain the premium workstation aesthetic:

*   **GlassPanel**: A container with the standard blur and border effect.
*   **SystemButton**: Standardized buttons with hover/active states.
*   **WindowFrame**: The wrapper component for all application windows.

## Extending the OS
To add a new application to the OS, it must be registered in the `AppRegistry.js`:

```javascript
import MyNewApp from './apps/MyNewApp';

export const Registry = [
  {
    id: 'my-new-app',
    name: 'New App',
    icon: 'icon_path.svg',
    component: MyNewApp
  }
];
```

---
*Document Version: 1.0.0*
*Last Updated: 2026-04-19*
