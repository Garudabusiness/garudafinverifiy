# Vercel Deployment - Quick Reference Card

## 🚀 Deploy in 3 Commands

```bash
# 1. Login to Vercel
vercel login

# 2. Deploy to production
cd garudaverify-frontend && vercel --prod

# 3. Set environment variables in Vercel dashboard
# NEXTAUTH_URL, NEXTAUTH_SECRET, NEXT_PUBLIC_API_URL
```

---

## 📋 Pre-Deployment Checklist

| Task | Status | Notes |
|------|--------|-------|
| Backend API deployed | [ ] | Must be accessible via HTTPS |
| Database migrated | [ ] | Run Prisma migrations |
| Environment variables ready | [ ] | Keep `NEXTAUTH_SECRET` secure |
| Production build tested | [ ] | `npm run build` should succeed ✓ |
| Secrets not in code | [ ] | Use `.env` not hardcoded values |

---

## 🔐 Required Environment Variables

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

Set in Vercel Dashboard → Settings → Environment Variables:

```
NEXTAUTH_URL=https://garudaverify.com
NEXTAUTH_SECRET=your-generated-secret-here
NEXT_PUBLIC_API_URL=https://api.garudaverify.com
```

---

## 📁 Files Modified/Created

| File | Status | Purpose |
|------|--------|---------|
| `vercel.json` | ✅ NEW | Vercel deployment config |
| `next.config.mjs` | ✅ UPDATED | Production optimizations |
| `tsconfig.json` | ✅ UPDATED | Path aliases fixed |
| `lib/api.ts` | ✅ UPDATED | Auth storage utilities |
| `VERCEL_DEPLOYMENT.md` | ✅ NEW | Full deployment guide |
| `PRODUCTION_SETUP.md` | ✅ NEW | Backend + Database setup |
| `VERCEL_DEPLOYMENT_SUMMARY.md` | ✅ NEW | Quick start guide |

---

## ✅ Production Build Status

```
Build: ✓ Successful
TypeScript: ✓ No errors
Size: ~93.5 kB (First Load JS)
Format: Standalone (Next.js optimized)
```

---

## 🎯 Deployment Workflow

1. **Backend Ready?**
   ```bash
   curl https://api.your-domain.com/health
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "chore: prepare Vercel deployment"
   git push origin main
   ```

3. **Connect to Vercel**
   - Go to vercel.com
   - Connect GitHub repo
   - Select `garudaverify-frontend` root directory

4. **Add Environment Variables**
   - NEXTAUTH_URL → Your domain
   - NEXTAUTH_SECRET → Generated secret
   - NEXT_PUBLIC_API_URL → Backend API URL

5. **Deploy**
   - Vercel auto-deploys on push
   - Or click "Deploy" manually

6. **Configure Domain**
   - Add custom domain in Vercel
   - Update DNS records
   - Wait for SSL (auto-generates)

7. **Verify**
   - Visit deployed URL
   - Test login functionality
   - Check browser console for errors

---

## 🔧 Backend CORS Configuration

Add to your NestJS backend:

```typescript
const corsOptions = {
  origin: [
    'https://garudaverify.vercel.app',
    'https://garudaverify.com',
    'https://www.garudaverify.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
};
app.enableCors(corsOptions);
```

---

## 🚨 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| **CORS Error** | Add frontend domain to backend CORS |
| **NextAuth error** | Verify NEXTAUTH_URL matches domain |
| **API 404** | Check NEXT_PUBLIC_API_URL is correct |
| **Build failed** | Check node_modules, run `npm install` |
| **Image 404** | Verify image domains in next.config.mjs |

---

## 📊 Monitoring After Launch

```bash
# Check frontend health
curl https://your-domain.com

# Check backend health
curl https://api.your-domain.com/health

# View Vercel logs
vercel logs <your-deployment-url>
```

Monitor in Vercel Dashboard:
- Analytics → Core Web Vitals
- Deployments → Function logs
- Settings → Usage

---

## 🔄 Rollback Procedure

If deployment breaks:
1. Vercel Dashboard → Deployments
2. Find previous stable version
3. Click "..." → "Promote to Production"
4. Verify rollback succeeded

---

## 📚 Documentation

- **Complete Guide:** `VERCEL_DEPLOYMENT.md`
- **Backend Setup:** `PRODUCTION_SETUP.md`
- **Quick Start:** `VERCEL_DEPLOYMENT_SUMMARY.md`

---

## 💡 Pro Tips

✅ Use Environment Scopes in Vercel for dev/preview/prod
✅ Enable "Automatically expose System Environment Variables"
✅ Set up branch deployments for testing
✅ Use Vercel Logs to debug issues
✅ Monitor Web Vitals regularly
✅ Set up error alerts in Vercel

---

## 🎉 You're Ready!

Everything is configured and tested. Time to deploy! 🚀

**Next:** Deploy to Vercel and enjoy your live application!
