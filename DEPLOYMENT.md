# Deployment Guide: Giri OS Full-Stack Vercel

Follow these steps to deploy both the frontend and backend of Giri OS to Vercel.

## 1. Prepare your GitHub Repository
Ensure all changes (including the new `vercel.json`) are committed and pushed to your GitHub repository.

## 2. Create a Project on Vercel
1. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** > **Project**.
3. Import your `Gisun OS` repository.

## 3. Project Configuration
On the "Configure Project" screen, set the following:

- **Framework Preset**: Select **Other**.
- **Root Directory**: Select the root of your repository (the directory containing `vercel.json`).
- **Build and Output Settings**:
  - **Build Command**: `cd client && npm install && npm run build`
  - **Output Directory**: `client/dist`
  - **Install Command**: `npm install`

## 4. Environment Variables
Add the following variables in the **Environment Variables** section:

| Variable | Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Ensures the Express server runs in production mode. |
| `BACKEND_URL` | `https://your-project.vercel.app` | Your final Vercel URL. |
| `SUPABASE_URL` | `your_supabase_url` | Your Supabase project URL. |
| `SUPABASE_KEY` | `your_service_role_key` | (Backend) Supabase service role key. |
| `VITE_SUPABASE_URL` | `your_supabase_url` | (Frontend) Same as above. |
| `VITE_SUPABASE_ANON_KEY` | `your_anon_key` | (Frontend) Supabase anon key. |

## 5. Deploy
Click **Deploy**. Vercel will build your React frontend and set up your Express server as a serverless function.

---

### Important Notes:
- **Serverless Limits**: The `GisunBridge` proxy is subject to Vercel's 4.5MB request/response limit. High-bandwidth activities might fail.
- **System Stats**: Metrics in the "Activity Monitor" will reflect the Vercel serverless environment, not a physical machine.
