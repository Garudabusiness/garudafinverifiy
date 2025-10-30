# Vercel Deployment Guide - GarudaVerify Frontend

## Overview
This guide covers the preparation and deployment of the GarudaVerify frontend (Next.js 14 application) to Vercel.

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- Backend API running and accessible
- Git repository properly configured

## Pre-Deployment Checklist

### 1. Local Environment Setup
- [ ] Node.js 18+ installed
- [ ] All dependencies installed: `npm install`
- [ ] Environment variables configured in `.env.local`
- [ ] Local build successful: `npm run build`
- [ ] No TypeScript errors: `npm run typecheck`
- [ ] No linting errors: `npm run lint`

### 2. Code Quality
- [ ] All components properly formatted
- [ ] No console errors or warnings
- [ ] No sensitive data in code (API keys, secrets, passwords)
- [ ] Images optimized for web
- [ ] All imports resolved correctly

### 3. Configuration Files
- [ ] `vercel.json` configured correctly
- [ ] `next.config.mjs` optimized for production
- [ ] `tsconfig.json` proper settings
- [ ] `.env.example` updated with all required variables

## Environment Variables for Vercel

### Required Environment Variables

Set these in Vercel Project Settings → Environment Variables:

#### `NEXTAUTH_URL` (Production)
- **Description:** The full URL of your deployed application
- **Example:** `https://garudaverify.vercel.app` (auto-set by Vercel) or custom domain `https://verify.garudaverify.com`
- **Required:** Yes
- **Visibility:** Production

#### `NEXTAUTH_SECRET`
- **Description:** Secret key for NextAuth.js JWT signing
- **Generate:** Run `openssl rand -base64 32` in terminal
- **Example:** `Vp5oM2kL9xX4qZ1sQ8wR3nF6pT0jH5bM=`
- **Required:** Yes
- **Visibility:** Production, Preview, Development
- **Security:** Keep this secret, never commit to git

#### `NEXT_PUBLIC_API_URL` (Production)
- **Description:** Backend API base URL for API calls
- **Example:** `https://api.garudaverify.com` or `https://backend-production.herokuapp.com`
- **Required:** Yes
- **Visibility:** Production, Preview, Development
- **Note:** This is PUBLIC and exposed to browser, so no sensitive data

### Optional Environment Variables

#### `VERCEL_ENV`
- Auto-set by Vercel (production, preview, development)
- Used for conditional logic in `next.config.mjs`

## Deployment Steps

### Step 1: Prepare Repository
```bash
# Ensure everything is committed
git status

# Push to main/production branch
git push origin main
```

### Step 2: Connect to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `garudaverify-frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next/standalone` (already configured)
   - **Install Command:** `npm install`

### Step 3: Set Environment Variables in Vercel

In Vercel Project Settings:

1. Navigate to **Settings** → **Environment Variables**
2. Add each variable:
   - `NEXTAUTH_URL`: Your production domain
   - `NEXTAUTH_SECRET`: Generated secret key
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

3. Configure Environment Scopes:
   - **Production:** Check Production
   - **Preview:** Check Preview (for PR deployments)
   - **Development:** Check Development (for local use)

### Step 4: Configure Domains

1. Go to **Settings** → **Domains**
2. Add custom domain if you have one
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate generation (automatic)

### Step 5: Verify Deployment

After deployment:

1. Visit your Vercel deployment URL
2. Test login with test credentials
3. Verify API connections work
4. Check browser console for errors
5. Test all major features
6. Verify NextAuth callbacks work

## Production Deployment Configuration

### Vercel Project Settings Recommendations

**Build & Development Settings:**
- Build Command: `npm run build`
- Install Command: `npm install`
- Development Command: `npm run dev`
- Output Directory: `.next/standalone`

**Functions:**
- Memory: 1024 MB (default)
- Max Duration: 30 seconds (default)

**Regions:**
- Primary: `iad1` (US - Virginia) - Default
- Add regional redundancy for better performance

**Serverless Functions:**
- Automatic optimal configuration
- NextAuth.js pages served as serverless functions

## Monitoring & Maintenance

### Post-Deployment Checks

- [ ] All pages load correctly
- [ ] No 404 errors for assets
- [ ] Images loading properly
- [ ] API calls working from production
- [ ] Authentication flow working
- [ ] Redirects working (login → dashboard)

### Performance Monitoring

1. Vercel Analytics → Check Core Web Vitals
2. Vercel Observability → Monitor function performance
3. Check Deployment logs for errors

### Rollback Procedure

If issues occur:

1. Go to **Deployments** in Vercel
2. Find the previous stable deployment
3. Click "Promote to Production"
4. Verify the rollback worked

## Environment-Specific Configuration

### Development
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev_secret_change_in_production
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Staging/Preview (Optional Vercel Preview)
```
NEXTAUTH_URL=https://[deployment-hash].vercel.app
NEXTAUTH_SECRET=[secure-random-key]
NEXT_PUBLIC_API_URL=https://api-staging.garudaverify.com
```

### Production
```
NEXTAUTH_URL=https://garudaverify.com (or your custom domain)
NEXTAUTH_SECRET=[secure-random-key]
NEXT_PUBLIC_API_URL=https://api.garudaverify.com
```

## Backend Integration for Production

The frontend requires a running backend API. Ensure:

1. **Backend API Endpoint**
   - Accessible from Vercel servers
   - CORS configured to accept requests from your Vercel domain
   - SSL/TLS enabled (HTTPS)

2. **Database Access**
   - Backend has connection to production database
   - Migrations run successfully
   - Proper environment variables set

3. **Authentication**
   - Backend JWT secrets match frontend expectations
   - Cookie settings correct for cross-domain requests
   - CORS headers include your Vercel domain

Example CORS configuration for backend:
```typescript
// In NestJS backend
const corsOptions = {
  origin: [
    'https://garudaverify.vercel.app',
    'https://garudaverify.com',
    'http://localhost:3000' // development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

## Troubleshooting

### Common Issues

**Issue: 500 Internal Server Error**
- Check Vercel logs: **Deployments** → **Function logs**
- Verify environment variables are set correctly
- Check backend API is accessible

**Issue: NextAuth Callback Errors**
- Verify `NEXTAUTH_URL` matches your deployment domain exactly
- Check `NEXTAUTH_SECRET` is set and matches between environments
- Review NextAuth pages (`/api/auth/...`) in logs

**Issue: API 404 Errors**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running and accessible
- Verify CORS configuration on backend

**Issue: Images not loading**
- Check image domains in `next.config.mjs`
- Verify remote pattern matches your CDN/storage
- Test with `unoptimized: true` temporarily

**Issue: Static files not found**
- Ensure all public files are in `/public` directory
- Check file paths are relative
- Verify no gitignore is excluding assets

## Security Considerations

1. **Secrets Management**
   - Never commit `.env.local` to git
   - Use Vercel's environment variables, not code
   - Rotate secrets regularly
   - Use strong random strings for NEXTAUTH_SECRET

2. **CORS & CSRF**
   - Frontend domain must match NEXTAUTH_URL exactly
   - Backend CORS must whitelist Vercel domain
   - NextAuth handles CSRF automatically

3. **SSL/TLS**
   - Always use HTTPS in production
   - Vercel provides free SSL certificates
   - Test with custom domains

4. **Headers**
   - Security headers configured in `next.config.mjs`
   - X-Frame-Options: SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - Content-Security-Policy can be added if needed

## Performance Optimization

The `next.config.mjs` includes:

- **Image Optimization:** Automatic WebP conversion, responsive images
- **Code Splitting:** Vendor bundles optimized for caching
- **Compression:** Automatic gzip compression
- **Minification:** SWC compiler for fast builds
- **Caching:** Serverless function caching strategies

## Monitoring Commands

```bash
# View deployment status
vercel status

# View logs (requires CLI)
vercel logs <deployment-url>

# Monitor real-time
vercel --prod --verbose
```

## References

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NextAuth.js Vercel Guide](https://next-auth.js.org/deployment)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Support

For issues:
1. Check Vercel Deployments logs
2. Review this guide's troubleshooting section
3. Check Next.js documentation
4. Contact Vercel support
