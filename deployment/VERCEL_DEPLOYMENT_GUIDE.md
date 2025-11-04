# Vercel Frontend Deployment Guide

## Overview
This guide provides step-by-step instructions to deploy the GarudaVerify frontend application to Vercel.

## Prerequisites
- Vercel account (free tier available at https://vercel.com)
- Git repository with frontend code
- GitHub account (for easy integration with Vercel)

## Deployment Steps

### Step 1: Prepare the Repository
1. Push your code to GitHub:
   ```bash
   cd vercel-frontend
   git init
   git add .
   git commit -m "Initial commit: frontend setup for Vercel"
   git branch -M main
   git remote add origin https://github.com/yourusername/garudaverify-frontend.git
   git push -u origin main
   ```

### Step 2: Create Vercel Project
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the repository: `garudaverify-frontend`
5. Vercel will auto-detect Next.js project settings

### Step 3: Configure Environment Variables
In Vercel Dashboard, go to **Settings → Environment Variables** and add:

```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate_with_openssl_rand_-base64_32>
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` value.

### Step 4: Deployment Configuration
The `vercel.json` file is already configured with:
- **Build Command:** `npm run build`
- **Output Directory:** `.next/standalone`
- **Install Command:** `npm install`
- **Region:** `iad1` (US East 1)

### Step 5: Deploy
1. Push changes to `main` branch:
   ```bash
   git push origin main
   ```
2. Vercel automatically deploys on push
3. Monitor deployment at https://vercel.com/dashboard

### Step 6: Post-Deployment Setup

#### Update Backend API URL
1. Deploy backend to Render first (see RENDER_DEPLOYMENT_GUIDE.md)
2. Copy the Render backend URL (e.g., `https://garudaverify-backend.onrender.com`)
3. Update `NEXT_PUBLIC_API_URL` in Vercel dashboard
4. Redeploy frontend

#### Configure NextAuth Callback URLs
1. Get your Vercel deployment URL from dashboard
2. Add to backend CORS configuration:
   ```
   CORS_ORIGINS=https://your-vercel-domain.vercel.app
   ```

## Environment Variables Reference

| Variable | Value | Example |
|----------|-------|---------|
| `NEXTAUTH_URL` | Your Vercel frontend URL | `https://garudaverify.vercel.app` |
| `NEXTAUTH_SECRET` | 32-character secret | Output of `openssl rand -base64 32` |
| `NEXT_PUBLIC_API_URL` | Render backend URL | `https://garudaverify-backend.onrender.com` |

## Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm install`
- Verify `next.config.mjs` is correctly configured
- Check build logs in Vercel dashboard

### Environment Variables Not Loaded
- Ensure variables are set in Vercel dashboard (not in `.env` file)
- Prefix public variables with `NEXT_PUBLIC_`
- Wait for redeployment after changing variables

### CORS Errors
- Verify `NEXT_PUBLIC_API_URL` points to correct backend
- Ensure backend has CORS configured for Vercel domain
- Check backend `CORS_ORIGINS` environment variable

### Authentication Issues
- Verify `NEXTAUTH_URL` matches your Vercel domain
- Regenerate `NEXTAUTH_SECRET` if needed
- Check backend JWT configuration

## Monitoring and Logging

1. **View Logs:** Vercel Dashboard → Deployments → Select deployment → Logs
2. **Monitor Performance:** Vercel Analytics (built-in)
3. **Error Tracking:** Check browser console for client errors

## Custom Domain Setup

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update `NEXTAUTH_URL` to your custom domain
4. Update backend `CORS_ORIGINS` accordingly

## Rollback

To rollback to a previous deployment:
1. Vercel Dashboard → Deployments
2. Find the previous successful deployment
3. Click "Redeploy"
4. Or push a previous commit to main branch

## Next Steps

1. Deploy backend to Render (see RENDER_DEPLOYMENT_GUIDE.md)
2. Configure database for backend
3. Set up monitoring and logging
4. Configure custom domain if needed
