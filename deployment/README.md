# GarudaVerify Deployment Package

This directory contains separated frontend and backend applications ready for deployment to production.

## 📁 Directory Structure

```
deployment/
├── vercel-frontend/              # Next.js 14 Frontend (Ready for Vercel)
│   ├── app/                      # Next.js app router
│   ├── lib/                      # Utility functions
│   ├── public/                   # Static assets
│   ├── package.json              # Dependencies (Node 20+)
│   ├── next.config.mjs           # Next.js configuration
│   ├── vercel.json               # Vercel deployment config
│   ├── tsconfig.json             # TypeScript config
│   ├── .env.example              # Environment variables template
│   └── .gitignore                # Git ignore rules
│
├── render-backend/               # NestJS Backend API (Ready for Render)
│   ├── src/                      # Source code
│   ├── prisma/                   # Database schema & migrations
│   ├── dist/                     # Compiled output
│   ├── package.json              # Dependencies (Node 20+)
│   ├── nest-cli.json             # NestJS CLI config
│   ├── tsconfig.json             # TypeScript config
│   ├── Dockerfile                # Docker configuration
│   ├── render.yaml               # Render deployment config (optional)
│   ├── Procfile                  # Process file for Render
│   ├── .env.example              # Environment variables template
│   └── .gitignore                # Git ignore rules
│
├── DEPLOYMENT_QUICK_START.md     # 5-minute quick start guide
├── VERCEL_DEPLOYMENT_GUIDE.md    # Detailed Vercel deployment guide
├── RENDER_DEPLOYMENT_GUIDE.md    # Detailed Render deployment guide
└── README.md                     # This file
```

## 🚀 Quick Start

### For the Impatient
1. See [`DEPLOYMENT_QUICK_START.md`](./DEPLOYMENT_QUICK_START.md)

### For Complete Setup
1. Deploy backend first: [`RENDER_DEPLOYMENT_GUIDE.md`](./RENDER_DEPLOYMENT_GUIDE.md)
2. Deploy frontend: [`VERCEL_DEPLOYMENT_GUIDE.md`](./VERCEL_DEPLOYMENT_GUIDE.md)

## 📋 Prerequisites

### For Backend (Render)
- [ ] Render account (https://render.com)
- [ ] GitHub repository
- [ ] PostgreSQL database (created via Render)

### For Frontend (Vercel)
- [ ] Vercel account (https://vercel.com)
- [ ] GitHub repository
- [ ] Backend URL (from Render deployment)

## 🎯 Deployment Overview

### Backend → Render
| Component | Details |
|-----------|---------|
| **Framework** | NestJS 10.3.7 |
| **Runtime** | Node.js 20.x |
| **Database** | PostgreSQL 16 |
| **ORM** | Prisma 5.17.0 |
| **Port** | 8080 |
| **Start Command** | `npm start` |
| **Build Command** | `npm run build && npx prisma generate` |

### Frontend → Vercel
| Component | Details |
|-----------|---------|
| **Framework** | Next.js 14.2.5 |
| **Runtime** | Node.js 20.x |
| **Output Mode** | Standalone (optimized) |
| **Build Command** | `npm run build` |
| **Auth** | NextAuth 5.0.0-beta.20 |

## 🔑 Environment Variables

### Backend (.env.example)
```env
PORT=8080
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_secret
JWT_ACCESS_EXPIRES=900
JWT_REFRESH_EXPIRES=1209600
CORS_ORIGINS=https://your-frontend-url.vercel.app
```

### Frontend (.env.example)
```env
NEXTAUTH_URL=https://your-frontend-url.vercel.app
NEXTAUTH_SECRET=your_secret
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

## ✅ Deployment Checklist

### Backend Deployment
- [ ] Create Render account
- [ ] Push backend code to GitHub
- [ ] Create PostgreSQL database on Render
- [ ] Create Web Service on Render
- [ ] Configure environment variables
- [ ] Run database migrations
- [ ] Test API health endpoint
- [ ] Copy backend URL

### Frontend Deployment
- [ ] Create Vercel account
- [ ] Push frontend code to GitHub
- [ ] Import project to Vercel
- [ ] Set environment variables
- [ ] Update NEXT_PUBLIC_API_URL with backend URL
- [ ] Deploy
- [ ] Update backend CORS_ORIGINS
- [ ] Test frontend connectivity

## 🧪 Testing Deployment

### Test Backend Health
```bash
curl https://your-backend.onrender.com/api/health
```

### Test Frontend
Visit: `https://your-frontend.vercel.app`

### Test API Connection
Check browser console for network errors when testing login/signup.

## 🔍 Monitoring

### Vercel Dashboard
- https://vercel.com/dashboard
- Monitor build deployments
- View runtime logs
- Check performance metrics

### Render Dashboard
- https://dashboard.render.com
- Monitor service uptime
- View application logs
- Check database status

## 🆘 Troubleshooting

### Build Failures
1. Check logs in deployment dashboard
2. Verify all environment variables are set
3. Run `npm install && npm run build` locally
4. Check for dependency conflicts

### Runtime Errors
1. Review service logs in dashboard
2. Check environment variables match `.env.example`
3. Verify database connectivity
4. Test API endpoints with curl

### Connection Issues
1. Verify backend CORS_ORIGINS includes frontend URL
2. Check frontend NEXT_PUBLIC_API_URL is correct
3. Test backend health endpoint
4. Check network tab in browser DevTools

See detailed guides for more troubleshooting:
- [Vercel Troubleshooting](./VERCEL_DEPLOYMENT_GUIDE.md#troubleshooting)
- [Render Troubleshooting](./RENDER_DEPLOYMENT_GUIDE.md#troubleshooting)

## 📚 Additional Resources

### Official Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)

### Configuration Files
- `vercel.json` - Vercel deployment settings
- `render.yaml` - Render deployment settings (alternative to Procfile)
- `Procfile` - Process definitions for Render
- `next.config.mjs` - Next.js build configuration
- `nest-cli.json` - NestJS CLI configuration

## 💡 Best Practices

1. **Environment Security**
   - Never commit `.env` files
   - Use `.env.example` as template
   - Rotate secrets regularly

2. **Database**
   - Use managed PostgreSQL (Render provides)
   - Enable automated backups
   - Keep migration history in git

3. **Monitoring**
   - Set up error alerts
   - Monitor API response times
   - Check database performance

4. **Updates**
   - Keep dependencies updated
   - Run `npm audit` regularly
   - Test updates locally first

## 🎓 Next Steps

1. ✅ Review this README
2. 📖 Read [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md)
3. 🔧 Follow [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md) for backend
4. 🌐 Follow [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for frontend
5. 🧪 Test your deployment
6. 🚀 Monitor in production

## 📞 Support

For issues or questions:
1. Check the relevant deployment guide's troubleshooting section
2. Review service logs in respective dashboards
3. Check official documentation links above
4. Review error messages in console

---

**Last Updated:** November 2024
**Versions:**
- Next.js: 14.2.5
- NestJS: 10.3.7
- Node.js: 20.x
- PostgreSQL: 16
