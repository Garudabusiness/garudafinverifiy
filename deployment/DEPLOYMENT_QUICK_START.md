# Deployment Quick Start Guide

## 5-Minute Overview

You have two separate applications:
1. **Frontend (Next.js)** → Deploy to **Vercel**
2. **Backend (NestJS API)** → Deploy to **Render**

## Quick Checklist

### Backend Deployment (Render) - Start First ⚡
- [ ] Create Render account at https://render.com
- [ ] Create PostgreSQL database on Render
- [ ] Create Web Service for backend
- [ ] Set environment variables in Render
- [ ] Deploy backend
- [ ] Copy backend URL (e.g., `https://garudaverify-backend.onrender.com`)

### Frontend Deployment (Vercel) - Deploy After Backend ✅
- [ ] Create Vercel account at https://vercel.com
- [ ] Connect GitHub repository
- [ ] Set environment variables in Vercel:
  - `NEXTAUTH_URL`: Your Vercel deployment URL
  - `NEXTAUTH_SECRET`: Generated secret
  - `NEXT_PUBLIC_API_URL`: Backend URL from step 1
- [ ] Deploy frontend

## Step-by-Step: Backend on Render

### 1. Setup Database (2 minutes)

```
1. Go to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Name: "garudaverify-db"
4. Create Database
5. Copy "Internal Database URL"
```

### 2. Deploy Backend Service (3 minutes)

```
1. Click "New +" → "Web Service"
2. Connect your GitHub backend repository
3. Configuration:
   - Name: garudaverify-backend
   - Build Command: npm install && npm run build && npx prisma generate
   - Start Command: npm start
4. Add Environment Variables (copy from .env.example):
   - DATABASE_URL: (paste from step 1)
   - JWT_ACCESS_SECRET: (generate new)
   - JWT_REFRESH_SECRET: (generate new)
   - CORS_ORIGINS: (update after frontend deployed)
5. Deploy
```

### 3. Get Your Backend URL
After deployment: `https://garudaverify-backend.onrender.com`

---

## Step-by-Step: Frontend on Vercel

### 1. Import Project (1 minute)

```
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import GitHub repository (frontend)
4. Vercel auto-detects Next.js
```

### 2. Environment Variables (2 minutes)

```
1. Settings → Environment Variables
2. Add:
   NEXTAUTH_URL = https://yourname.vercel.app
   NEXTAUTH_SECRET = (run: openssl rand -base64 32)
   NEXT_PUBLIC_API_URL = https://garudaverify-backend.onrender.com
3. Save
```

### 3. Deploy
```
1. Click "Deploy"
2. Wait for build to complete
3. Get your Vercel URL: https://yourname.vercel.app
```

### 4. Update Backend CORS
Go back to Render and update `CORS_ORIGINS`:
```
CORS_ORIGINS=https://yourname.vercel.app
```

---

## Folder Structure

```
deployment/
├── vercel-frontend/          # Ready to deploy to Vercel
│   ├── vercel.json          # Vercel config
│   ├── .env.example         # Environment template
│   └── ... (Next.js app)
│
├── render-backend/           # Ready to deploy to Render
│   ├── render.yaml          # Render config
│   ├── Procfile             # Release commands
│   ├── .env.example         # Environment template
│   └── ... (NestJS app)
│
├── VERCEL_DEPLOYMENT_GUIDE.md    # Detailed Vercel guide
├── RENDER_DEPLOYMENT_GUIDE.md    # Detailed Render guide
└── DEPLOYMENT_QUICK_START.md     # This file
```

---

## Generate Secrets

### NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

### JWT Secrets
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
(Run twice for two different secrets)

---

## Troubleshooting

### Backend won't start
1. Check Render logs for errors
2. Verify DATABASE_URL is correct
3. Check all environment variables are set

### Frontend build fails
1. Check Vercel logs
2. Verify NEXT_PUBLIC_API_URL is set
3. Check next.config.mjs is correct

### Can't connect frontend to backend
1. Verify CORS_ORIGINS on backend matches frontend domain exactly
2. Check NEXT_PUBLIC_API_URL is correct
3. Test: `curl <NEXT_PUBLIC_API_URL>/health`

### Database connection errors
1. Verify DATABASE_URL is complete and correct
2. Check database is running (green status on Render)
3. Run migrations: See database logs in Render

---

## After Deployment

1. Test API endpoints:
   ```bash
   curl https://garudaverify-backend.onrender.com/api/health
   ```

2. Test frontend at: `https://yourname.vercel.app`

3. Monitor in dashboards:
   - Vercel: https://vercel.com/dashboard
   - Render: https://dashboard.render.com

4. Setup monitoring alerts

---

## Cost Estimates (Free Tier Available)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Vercel | Yes | 100GB bandwidth/month |
| Render Web | Yes | 750 hours/month |
| Render PostgreSQL | Yes | 1 free instance |

---

## Need More Help?

- **Vercel Issues:** See `VERCEL_DEPLOYMENT_GUIDE.md`
- **Render Issues:** See `RENDER_DEPLOYMENT_GUIDE.md`
- **Setup Questions:** Check `.env.example` files
