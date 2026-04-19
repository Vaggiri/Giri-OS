# GPG Signing Guide (Windows)

This guide provides step-by-step instructions to set up GPG commit signing from scratch on Windows. This ensures that every commit you make is cryptographically verified as yours, granting you the "Verified" badge on GitHub.

## 1. Install GPG Tools
You need the GnuPG tools installed on your system.
1. Download **Gpg4win** from [gpg4win.org](https://gpg4win.org/).
2. Run the installer. You only need "GnuPG" (the core tool); you can uncheck other components like Kleopatra if you prefer the command line.
3. Open your terminal (PowerShell or Git Bash) and verify the installation:
   ```bash
   gpg --version
   ```

## 2. Generate a New GPG Key
1. Run the generation command:
   ```bash
   gpg --full-generate-key
   ```
2. Follow the prompts:
   * **Algorithm**: Select `(1) RSA and RSA (default)`.
   * **Key Size**: Type `4096`.
   * **Validity**: Press `0` (key does not expire) or set a reasonable duration (e.g., `1y` for one year).
   * **User Details**: 
     * **Real Name**: Your Name (e.g., Vaggiri).
     * **Email**: This **MUST** match a verified email on your GitHub account.
     * **Comment**: (Optional) e.g., GisunOS Primary Key.
3. Type `O` (Okay) to confirm.
4. **Enter a strong Passphrase**: You will need this when you commit code.

## 3. Extract the Public Key for GitHub
1. List your secret keys to find your Key ID:
   ```bash
   gpg --list-secret-keys --keyid-format=long
   ```
   Look for the line starting with `sec`. Example:
   `sec   rsa4096/ABCDEF1234567890 2026-04-19 [SC]`
   Your Key ID is the part after the slash: `ABCDEF1234567890`.

2. Export your key in ASCII armor format:
   ```bash
   gpg --armor --export ABCDEF1234567890
   ```
3. Copy the entire output (including the BEGIN and END lines).

## 4. Add the Key to GitHub
1. Sign in to GitHub.
2. Go to **Settings > SSH and GPG keys**.
3. Click **New GPG key**.
4. Paste your public key and click **Add GPG key**.

## 5. Configure Git to Auto-Sign
Tell Git to use your key and sign every commit automatically:

1. Set your signing key:
   ```bash
   git config --global user.signingkey ABCDEF1234567890
   ```
2. Enable automatic signing:
   ```bash
   git config --global commit.gpgsign true
   ```
3. (Important for Windows) Tell Git where the GPG program is:
   ```bash
   git config --global gpg.program "C:\Program Files (x86)\GnuPG\bin\gpg.exe"
   ```
   *Note: If you installed GPG in a different location, use `where gpg` in your terminal to find the correct path.*

## 6. Verify Your Setup
Make a small change, commit it, and push:
```bash
git add .
git commit -m "Testing GPG signing"
git push origin main
```
If you check the commit on GitHub, you should now see the green **Verified** badge.

---
*Last Updated: 2026-04-19*
*System Requirement: Git for Windows / Gpg4win*
