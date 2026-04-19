# GisunOS Security Architecture

This document details the security layers and philosophies that protect GisunOS and its users.

## Layer 1: Virtual Firewall (VFW)
The VFW is a middle-man service for all outbound network traffic.

### How it works:
1.  **Interception**: Every app-level web request is routed through a central validation module.
2.  **Whitelist Check**: URLs are checked against a predefined list of "Known Safe" domains.
3.  **User Consent**: For any domain not on the whitelist, the system prompts the user with a "Firewall Alert" asking for permission.
4.  **Logging**: All blocked and allowed requests are logged in the **System Security Log**.

## Layer 2: Isolated Execution (Sandboxing)
Applications in GisunOS are categorized by trust levels:

*   **System Apps (High Trust)**: Direct access to the Core Shell and storage layer.
*   **Third-Party Apps (Medium Trust)**: Access only via the filtered `GisunOS.API`.
*   **Untrusted Web Apps (Low Trust)**: Executed in an `iframe` with the `sandbox` attribute, preventing access to the main OS DOM and cookie/storage space.

## Layer 3: Storage Security (Supabase RLS)
GisunOS leverages Supabase's **Row Level Security** to ensure that:
*   Users can only read and write their own data.
*   System files are protected by write-after-read policies.
*   Metadata is immutable for verified system core components.

## Layer 4: Permission Management
Permissions are handled using a **Least Privilege** model. Apps must explicitly declare and request access to:
*   `system_notifications`
*   `audio_output`
*   `storage_read_write`
*   `network_access`

Users can audit and revoke these permissions at any time via the **Settings App**.

## Reporting Security Issues
We maintain a zero-tolerance policy for security bypasses. If you find a way to circumvent the Firewall or DOM isolation, please notify us immediately as per the [SECURITY.md](../SECURITY.md) guidelines.

---
*Document Version: 1.0.0*
*Last Updated: 2026-04-19*
