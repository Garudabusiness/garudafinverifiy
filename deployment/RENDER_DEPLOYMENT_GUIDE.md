# Render Backend Deployment Guide

## Overview
This guide provides step-by-step instructions to deploy the GarudaVerify NestJS backend API to Render.

## Prerequisites
- Render account (free tier available at https://render.com)
- Git repository with backend code
- GitHub account (for easy integration with Render)
- PostgreSQL database (Render provides managed databases)

## Deployment Steps

### Step 1: Prepare the Repository
1. Push your code to GitHub:
   ```bash
   cd render-backend
   git init
   git add .
   git commit -m "Initial commit: backend setup for Render"
   git branch -M main
   git remote add origin https://github.com/yourusername/garudaverify-backend.git
   git push -u origin main
   ```

### Step 2: Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Configure database:
   - **Name:** `garudaverify-db`
   - **Database:** `garudaverify`
   - **User:** `garudaverify`
   - **Region:** Choose closest to you
   - **Plan:** Standard (free option available)
4. Click "Create Database"
5. Copy the **Internal Database URL** (you'll need this for backend)

### Step 3: Create Web Service on Render

1. Click "New +" → "Web Service"
2. Select "Deploy an existing repository" → Connect GitHub
3. Select your backend repository
4. Configure:
   - **Name:** `garudaverify-backend`
   - **Environment:** `Node`
   - **Region:** Same as database
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build && npx prisma generate`
   - **Start Command:** `npm start`
   - **Plan:** Standard (free option available)

### Step 4: Configure Environment Variables

In Render Dashboard → Web Service → Environment:

```
PORT=8080
NODE_ENV=production
DATABASE_URL=<paste_from_step_2>
JWT_ACCESS_SECRET=<generate_secure_secret>
JWT_REFRESH_SECRET=<generate_secure_secret>
JWT_ACCESS_EXPIRES=900
JWT_REFRESH_EXPIRES=1209600
CORS_ORIGINS=https://your-domain.vercel.app
```

**Generate Secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run this command twice to get both JWT secrets.

### Step 5: Deploy
1. Click "Deploy" button on Render dashboard
2. Monitor deployment progress in "Logs" tab
3. Wait for "Deploy successful" message
4. Copy the service URL (e.g., `https://garudaverify-backend.onrender.com`)

### Step 6: Post-Deployment Setup

#### Run Database Migrations
1. Render automatically runs Procfile release command
2. Verify migrations completed in logs
3. If needed, manually trigger: Go to Service → Shell → Run `npx prisma migrate deploy`

#### Update Frontend with Backend URL
1. Copy your Render backend URL
2. Update Vercel frontend `NEXT_PUBLIC_API_URL` environment variable
3. Redeploy frontend (see VERCEL_DEPLOYMENT_GUIDE.md)

## Environment Variables Reference

| Variable | Value | Example |
|----------|-------|---------|
| `PORT` | Backend port | `8080` |
| `NODE_ENV` | Environment type | `production` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host/db` |
| `JWT_ACCESS_SECRET` | 64-char hex secret | Random hex string |
| `JWT_REFRESH_SECRET` | 64-char hex secret | Random hex string |
| `JWT_ACCESS_EXPIRES` | Seconds | `900` |
| `JWT_REFRESH_EXPIRES` | Seconds | `1209600` |
| `CORS_ORIGINS` | Frontend domain | `https://garudaverify.vercel.app` |

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify all dependencies in `package.json`
- Ensure `dist` folder is not in `.gitignore`
- Check Node version matches (`20.x`)

### Database Connection Failed
- Verify `DATABASE_URL` is correctly copied from PostgreSQL service
- Check database is in running state (green status)
- Verify database user credentials
- Test connection: `psql <DATABASE_URL>`

### Migration Errors
- Check Procfile release command is correct
- Verify Prisma schema is valid
- Check database user has proper permissions
- Manually run: `npx prisma migrate status`

### Service Won't Start
- Check logs for error messages
- Verify `npm start` script runs correctly locally
- Ensure all environment variables are set
- Check Node.js version compatibility

### CORS Errors
- Verify `CORS_ORIGINS` matches frontend domain exactly
- Include protocol: `https://domain.vercel.app`
- Multiple origins: `https://domain1.com,https://domain2.com`

## Monitoring and Logging

1. **View Logs:** Render Dashboard → Service → Logs
2. **Monitor Health:** Service dashboard shows uptime
3. **Error Alerts:** Configure in Settings → Notifications

## Database Management

### Access Database CLI
1. Render Dashboard → PostgreSQL → Connect
2. Use connection string in terminal:
   ```bash
   psql postgresql://user:pass@host:5432/database
   ```

### Backup Database
1. Render provides automatic daily backups
2. Manual backup: Use `pg_dump` utility
   ```bash
   pg_dump <DATABASE_URL> > backup.sql
   ```

### Scale Database
1. Render Dashboard → PostgreSQL → Plan
2. Upgrade plan as needed
3. No downtime during scaling

## Restart Service

To restart the backend service:
1. Render Dashboard → Service
2. Click "Manual Deploy"
3. Or: Settings → Restart → Restart Service

## Deployment Frequency

- Render automatically redeploys on push to main branch
- Wait ~2-5 minutes for deployment to complete
- Check logs to verify successful deployment
- Rollback by pushing previous commit to main

## Security Considerations

1. **Never commit `.env` file** to repository
2. **Rotate secrets regularly:**
   - Generate new JWT secrets
   - Update in Render environment variables
   - Existing tokens remain valid until expiration
3. **Keep dependencies updated:**
   - Run `npm audit` regularly
   - Update packages: `npm update`
   - Push updates to main branch
4. **Database security:**
   - Use strong passwords for database
   - Restrict database access to service IP
   - Regular backups enabled

## Next Steps

1. Deploy backend to Render (this guide)
2. Deploy frontend to Vercel (see VERCEL_DEPLOYMENT_GUIDE.md)
3. Test API endpoints from frontend
4. Set up monitoring and logging
5. Configure custom domain for backend if needed
6. Set up automatic database backups
