# Next Steps & Deployment Guide

## Backend Setup

### 1. Install Dependencies
The new modules require no additional npm packages - they use built-in NestJS decorators.

### 2. Update Imports (if needed)
Ensure the following are in `package.json`:
```json
{
  "dependencies": {
    "@nestjs/common": "^10.3.7",
    "@nestjs/platform-express": "^10.3.7",
    "@prisma/client": "^5.17.0",
    "class-validator": "^0.14.0"
  }
}
```

### 3. Build Backend
```bash
cd garudaverify-backend
npm install
npm run build
```

### 4. Database Setup
```bash
npx prisma generate
npx prisma migrate dev
npx ts-node src/seed.ts  # Seed test data
```

### 5. Run Backend
```bash
npm run start
# or for development:
npm run start:dev
```

### 6. Create Uploads Directory
```bash
mkdir -p uploads
```
The backend will auto-create this if it doesn't exist.

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd garudaverify-frontend
npm install
```

### 2. Environment Variables
Update `.env.local`:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 3. Build Frontend
```bash
npm run build
```

### 4. Run Frontend
```bash
npm run dev  # Development
npm run start  # Production
```

---

## Testing Workflow

### 1. Login with Test Accounts
All three dashboards are now fully functional with these credentials:

**Admin Account:**
- Email: admin@garudaverify.in
- Password: Admin@123
- Features: Full system access, request management, agent assignment

**Client Account:**
- Email: client@acme.com
- Password: Client@123
- Features: Create requests, track status, view evidence

**Field Agent Account:**
- Email: field@garudaverify.in
- Password: Field@123
- Features: View assignments, upload evidence, mark complete

### 2. Test Admin Dashboard
- [ ] Login as admin
- [ ] Verify you see all requests in table
- [ ] Test search functionality
- [ ] Test status filtering
- [ ] View request details
- [ ] Check stats cards update correctly

### 3. Test Client Dashboard
- [ ] Login as client
- [ ] Verify you see only your requests
- [ ] Click "Create Request" button
- [ ] Fill form with test data
- [ ] Submit and verify it appears in table
- [ ] Test filtering and search
- [ ] Verify stats update correctly

### 4. Test Field Agent Dashboard
- [ ] Login as field agent
- [ ] Verify you see assigned jobs (admin must assign first)
- [ ] Click "View Details" on an assignment
- [ ] Verify location information displays
- [ ] Click "Start Job" to change status
- [ ] Click "Mark Complete" to finish (requires confirmation)
- [ ] Verify stats update

### 5. Test Evidence Upload (Field Agent)
- [ ] From assignment detail page
- [ ] Upload a photo or document
- [ ] Verify file appears in evidence list
- [ ] Try adding GPS coordinates if available
- [ ] Client should see evidence when viewing request

---

## Missing Pages to Create

The following route links work but don't have pages yet. Consider creating:

### Admin Routes
- `/admin/requests` - Request detail and management page
- `/admin/requests/:id` - Single request view with assignment creation
- `/admin/agents` - List and manage field agents
- `/admin/clients` - List client organizations

### Client Routes
- `/client/requests/:id` - Request detail with evidence gallery

### Field Agent Routes
- `/field/assignment/:id` - Assignment detail with evidence upload

---

## Additional Features to Consider

### 1. Evidence Gallery
```tsx
// Create /app/components/EvidenceGallery.tsx
// Display uploaded photos/videos in grid
// Show GPS location on map
// Download option for files
```

### 2. Request Detail Pages
- Full request information
- Timeline of status changes
- Evidence submissions
- Assignment history
- Notes and comments

### 3. Real-time Updates
```ts
// Add WebSocket support for live notifications
// Notify when request assigned
// Notify when evidence uploaded
// Real-time status updates
```

### 4. Notifications System
```ts
// In-app notifications for:
// - New assignments
// - Request status changes
// - Evidence uploaded
// - Task deadlines approaching
```

### 5. Map Integration
```tsx
// Show location coordinates for assignments
// Mark visited locations
// Route planning for field agents
```

### 6. Report Generation
```ts
// PDF export for verification reports
// Include all evidence photos
// Summary of findings
// Signature blocks
```

### 7. Performance Optimization
```ts
// Add pagination to all list views
// Implement infinite scroll
// Cache requests list
// Lazy load images
```

---

## Troubleshooting

### Backend Issues

**Port 8080 already in use:**
```bash
# Kill the process using port 8080
lsof -ti:8080 | xargs kill -9

# Or change port in .env
PORT=8081
```

**Database connection error:**
```bash
# Check DATABASE_URL in .env
# Verify PostgreSQL is running
# Recreate migrations
npx prisma migrate reset
```

**JWT token errors:**
```bash
# Regenerate JWT secrets in .env
JWT_ACCESS_SECRET=$(openssl rand -base64 32)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)
```

### Frontend Issues

**API connection refused:**
- Verify backend is running on correct port
- Check NEXT_PUBLIC_API_URL in .env
- CORS should be configured in backend

**Login redirects to blank page:**
- Check browser console for errors
- Verify tokens are being stored in localStorage
- Check that protected routes are loading

**Styles not applying:**
```bash
# Tailwind CSS not building
npm run build -- --clean-on-start
```

---

## Deployment Checklist

### Backend Deployment
- [ ] Set production environment variables
- [ ] Use strong JWT secrets
- [ ] Configure CORS properly (not localhost)
- [ ] Set up file storage (S3 or similar)
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure error logging
- [ ] Set up monitoring/alerts

### Frontend Deployment
- [ ] Update API URL to production backend
- [ ] Set NEXTAUTH_SECRET to strong value
- [ ] Enable HTTPS
- [ ] Configure CSP headers
- [ ] Set up analytics
- [ ] Test all dashboards on production
- [ ] Configure CDN for static assets

---

## Performance Optimization

### Backend
```ts
// Add caching for frequently accessed data
// Implement request pagination (already done)
// Add database indexes on searched fields
// Use eager loading to avoid N+1 queries (already configured)
```

### Frontend
```ts
// Split components into smaller chunks
// Lazy load dashboard components
// Optimize images with Next.js Image component
// Implement React.memo for pure components
```

---

## Security Considerations

### Current Implementation
✅ JWT token-based auth
✅ Role-based access control
✅ Password hashing with Argon2
✅ Request validation with DTOs
✅ HTTPS ready

### Recommended Additions
- [ ] Rate limiting on API endpoints
- [ ] CSRF protection
- [ ] Input sanitization
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS protection headers
- [ ] Secure cookie flags
- [ ] Two-factor authentication
- [ ] Audit logging
- [ ] File upload validation

---

## Maintenance

### Regular Tasks
- Monitor error logs
- Review authentication attempts
- Back up database daily
- Update dependencies monthly
- Review and rotate JWT secrets quarterly
- Clean up old uploaded files

### Monitoring Metrics
- Request latency
- Error rates
- Authentication failures
- Active user sessions
- Storage usage
- Database performance

---

## Support & Documentation

### For Users
- Create user guide with screenshots
- Document each dashboard functionality
- Provide FAQ section
- Create video tutorials

### For Developers
- API documentation (Swagger/OpenAPI)
- Database schema documentation
- Component library documentation
- Deployment runbooks

---

## Version History

### v1.0 (Current)
- Full dashboard implementation
- Authentication system
- Request management
- Evidence upload
- Role-based access control

### Future Releases
- v1.1: Report generation, notifications
- v1.2: Map integration, real-time updates
- v1.3: Analytics dashboard, advanced filtering
- v2.0: Mobile app, API marketplace

---

## Contact & Support

For issues or questions:
1. Check the DASHBOARD_FIXES_SUMMARY.md for implementation details
2. Review console logs for error messages
3. Check database with: `npx prisma studio`
4. Test API endpoints with Postman
