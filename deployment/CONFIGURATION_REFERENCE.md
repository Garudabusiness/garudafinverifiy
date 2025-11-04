# Configuration Reference Guide

## Frontend Configuration (Vercel)

### vercel.json
Located in `vercel-frontend/vercel.json`

```json
{
  "version": 2,
  "public": false,
  "buildCommand": "npm run build",
  "outputDirectory": ".next/standalone",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  },
  "env": {
    "NEXTAUTH_URL": "@nextauth_url",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "NEXT_PUBLIC_API_URL": "@next_public_api_url"
  },
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

**Key Settings:**
- **Version:** 2 (latest)
- **Output Directory:** `.next/standalone` (optimized for serverless)
- **Region:** `iad1` (US East 1 - change as needed)
- **Auto-deployment:** Enabled for main branch
- **API Functions:** 1GB memory, 30-second timeout

### next.config.mjs
Key configurations:

```javascript
// Output format for Vercel
output: 'standalone'

// Security headers
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin

// Image optimization
remotePatterns: https://** and http://localhost

// Webpack optimization
Code splitting for vendor chunks

// Compression
SWC minification enabled
```

### Environment Variables

| Variable | Example | Required | Notes |
|----------|---------|----------|-------|
| `NEXTAUTH_URL` | `https://myapp.vercel.app` | Yes | Must match Vercel domain |
| `NEXTAUTH_SECRET` | 32-char base64 | Yes | Generate with `openssl rand -base64 32` |
| `NEXT_PUBLIC_API_URL` | `https://api.onrender.com` | Yes | Backend API URL |

### Build Process
```bash
npm install
npm run build
# Output: .next/standalone directory
```

### Deployment Triggers
- Push to `main` branch
- Manual redeploy from dashboard
- Environment variable changes

---

## Backend Configuration (Render)

### render.yaml
Located in `render-backend/render.yaml`

```yaml
services:
  - type: web
    name: garudaverify-backend
    env: node
    region: oregon
    plan: standard
    buildCommand: npm install && npm run build && npx prisma generate
    startCommand: npm start
    healthCheckPath: /health
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: garudaverify-db
          property: connectionString
```

**Key Settings:**
- **Region:** oregon (change to your preferred region)
- **Plan:** standard (free tier available)
- **Health Check:** /health endpoint every 30 seconds
- **Instances:** 1 (scale as needed)

### Procfile
Located in `render-backend/Procfile`

```
web: npm start
release: npx prisma migrate deploy && npx prisma generate
```

**Explanation:**
- **web:** Main process (Node.js server)
- **release:** Runs migrations before each deploy

### package.json Scripts
```json
{
  "scripts": {
    "start": "node dist/main",
    "start:dev": "nest start --watch",
    "build": "nest build",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate deploy",
    "seed": "ts-node src/seed.ts"
  },
  "engines": {
    "node": "20.x"
  }
}
```

### Environment Variables

| Variable | Example | Required | Notes |
|----------|---------|----------|-------|
| `PORT` | `8080` | Yes | Must be 8080 |
| `NODE_ENV` | `production` | Yes | |
| `DATABASE_URL` | `postgresql://...` | Yes | From Render PostgreSQL |
| `JWT_ACCESS_SECRET` | 64-char hex | Yes | Generate securely |
| `JWT_REFRESH_SECRET` | 64-char hex | Yes | Generate securely |
| `JWT_ACCESS_EXPIRES` | `900` | Yes | 15 minutes in seconds |
| `JWT_REFRESH_EXPIRES` | `1209600` | Yes | 14 days in seconds |
| `CORS_ORIGINS` | `https://app.vercel.app` | Yes | Frontend URL |

### Database Configuration

**PostgreSQL on Render:**
```yaml
databases:
  - name: garudaverify-db
    databaseName: garudaverify
    user: garudaverify
    plan: standard
```

**Connection String Format:**
```
postgresql://username:password@host:5432/database_name
```

### Build Process
```bash
npm install
npm run build
npx prisma generate
npx prisma migrate deploy
npm start
```

### Deployment Triggers
- Push to `main` branch
- Manual deploy from dashboard
- Render CLI: `render deploy-service`

### Health Check
- **Endpoint:** `/health`
- **Interval:** 30 seconds
- **Timeout:** 5 seconds
- **Failure Threshold:** 3 consecutive failures = restart

---

## Database Configuration

### Prisma Setup
Located in `render-backend/prisma/`

**prisma/schema.prisma:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Migrations:**
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# View status
npx prisma migrate status
```

### Database Access
```bash
# Connect to database
psql postgresql://user:pass@host:5432/dbname

# View tables
\dt

# List databases
\l
```

---

## Comparison: Vercel vs Render

| Feature | Vercel | Render |
|---------|--------|--------|
| **Best For** | Frontend/Next.js | Backend/API |
| **Scaling** | Automatic | Manual/Autoscale |
| **Cold Start** | None | Possible on free tier |
| **Database** | External | Can host PostgreSQL |
| **Free Tier** | Yes | Yes |
| **Custom Domain** | Yes | Yes |
| **SSL/TLS** | Built-in | Built-in |
| **Monitoring** | Analytics dashboard | Logs + metrics |

---

## DNS Configuration

### Custom Domain on Vercel
1. Add domain in Settings → Domains
2. Update nameservers or add CNAME records
3. Wait for DNS propagation (24-48 hours)
4. Update `NEXTAUTH_URL` to custom domain

### Custom Domain on Render
1. Add domain in Settings → Custom Domains
2. Update DNS records
3. Render provides exact DNS setup instructions
4. Update `CORS_ORIGINS` in environment variables

---

## Security Checklist

### Frontend
- [ ] `NEXTAUTH_SECRET` is 32+ characters
- [ ] `NEXTAUTH_URL` matches deployment domain
- [ ] No sensitive data in `NEXT_PUBLIC_*` variables
- [ ] CORS properly configured on backend

### Backend
- [ ] JWT secrets are 32+ characters
- [ ] `DATABASE_URL` uses strong password
- [ ] `CORS_ORIGINS` restricted to frontend domains
- [ ] No `.env` file committed to git
- [ ] All environment variables set in dashboard

### Database
- [ ] Regular backups enabled
- [ ] Database user has limited permissions
- [ ] SSL/TLS enabled for connections
- [ ] IP whitelist configured (if available)

---

## Performance Optimization

### Frontend
- Next.js standalone output reduces bundle size
- Image optimization enabled
- Code splitting via webpack
- SWC minification enabled
- Compression enabled

### Backend
- Node.js 20 (latest LTS)
- Prisma generates optimized queries
- Helmet enables security headers
- Connection pooling recommended
- Consider caching for frequent queries

### Database
- Create indexes on frequently queried columns
- Use connection pooling
- Regular VACUUM (maintenance)
- Monitor slow queries
- Archive old data

---

## Monitoring & Logging

### Vercel
- **Dashboard:** https://vercel.com/dashboard
- **Logs:** Deployments → Select → Logs
- **Analytics:** Built-in performance metrics
- **Alerts:** Email on failures

### Render
- **Dashboard:** https://dashboard.render.com
- **Logs:** Service → Logs
- **Metrics:** Basic uptime monitoring
- **Alerts:** Email on service restart

### Best Practices
1. Monitor error rates daily
2. Check database performance weekly
3. Review logs for warnings
4. Set up error notifications
5. Track API response times

---

## Troubleshooting Commands

### Frontend
```bash
# Build locally
npm run build

# Preview production build
npm run build && npm start

# Check TypeScript
npm run typecheck

# Lint code
npm run lint
```

### Backend
```bash
# Build locally
npm run build

# Check TypeScript
npx tsc --noEmit

# Test database connection
psql $DATABASE_URL

# View migrations
npx prisma migrate status

# Generate Prisma client
npx prisma generate
```

---

## Version Information

**Frontend Stack:**
- Next.js: 14.2.5
- React: 18.3.1
- TypeScript: 5.5.4
- Tailwind CSS: 3.4.4
- NextAuth: 5.0.0-beta.20

**Backend Stack:**
- NestJS: 10.3.7
- Prisma: 5.17.0
- PostgreSQL: 16
- TypeScript: 5.5.4
- Node.js: 20.x

---

**Last Updated:** November 2024
