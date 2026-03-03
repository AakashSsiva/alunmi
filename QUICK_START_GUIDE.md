# Alumni Platform - Quick Start & Testing Guide

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git (optional)

### Starting the Application

#### 1. Start Backend Server
```bash
cd server
npm install  # Only needed first time
npm run dev  # or: npm start
```
**Backend runs on:** `http://localhost:4000`

#### 2. Start Frontend Server
```bash
cd ../
npm install  # Only needed first time
npm run dev
```
**Frontend runs on:** `http://localhost:8081` or `http://localhost:8080`

---

## Testing the Dashboards

### 1. Access the Application
Open browser and go to: `http://localhost:8081`

### 2. Create Test Account (Alumni)
- Click "Register" button
- Fill in details:
  - **Name:** John Doe
  - **Email:** john@example.com
  - **Password:** Test@123
  - **Role:** Select "Alumni"
  - **Department:** Computer Science (or any)
  - **Graduation Year:** 2020
- Click "Register" → Should redirect to Dashboard

### 3. Create Admin Account
- Register another account with:
  - **Email:** admin@example.com
  - **Password:** Admin@123
  - **Role:** Admin
- Admin will see Admin Dashboard instead of Alumni Dashboard

### 4. Test Alumni Dashboard
**Features to test:**

✅ **Dashboard Stats**
- Total available jobs display
- Upcoming events count
- Network connections count

✅ **Create Post**
- Click "Quick Post" button
- Enter title and content
- Click "Post"
- Should see success message: "Posted"

✅ **Suggested Connections**
- View "People You May Know" section
- Click "Connect" button
- Should see confirmation message

### 5. Test Admin Dashboard
**Features to test:**

✅ **Analytics Cards**
- Total Alumni count displays
- Active Users count
- Pending Posts count
- Approved Posts count

✅ **Moderation Tab**
- List of pending posts (if any exist)
- "Approve" button - marks post as approved
- "Deny" button - shows feedback form
  - Can add feedback message
  - "Confirm Denial" saves denial
  - "Cancel" closes form

✅ **Applications Tab**
- Shows pending applications (if any)
- Applications table displays:
  - Alumni name
  - Applied to event
  - Application date
  - Status
- "Approve" button processes application

✅ **Analytics Tab**
- **Platform Distribution Chart**
  - Shows post counts by platform
  - Displays as percentage bars
  
- **Upcoming Events**
  - Lists upcoming events
  - Shows event title, date, and type

---

## Troubleshooting

### Issue: "Cannot find module" error
**Solution:**
- Clear cache: `rm -rf node_modules` && `npm install`
- Restart dev server: Stop with `Ctrl+C`, run `npm run dev`

### Issue: Port already in use (Port 8080/8081 in use)
**Solution:**
```bash
# Find process using the port
lsof -i :8080

# Kill the process (if needed)
kill -9 <PID>

# Or start on different port
npm run dev -- --port 3000
```

### Issue: Backend not responding (API calls failing)
**Solution:**
1. Check backend is running: `curl http://localhost:4000/health`
2. Should return: `{"status":"ok"}`
3. If not, restart backend server

### Issue: Can't login (401 Unauthorized)
**Solution:**
1. Check credentials are correct
2. Check backend database has users (may need to seed)
3. Check JWT_SECRET is set in `.env`

---

## API Health Checks

### Backend Health
```bash
curl http://localhost:4000/health
# Expected: {"status":"ok"}
```

### Frontend Build
```bash
npm run build
# Should complete with no errors
```

---

## File Structure

```
Alumni Platform/
├── server/                    # Backend
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth middleware
│   │   └── index.ts          # Server entry point
│   └── package.json
│
├── src/                       # Frontend (React)
│   ├── pages/
│   │   ├── Dashboard.tsx      # Routes to Admin/Alumni
│   │   ├── AdminDashboard.tsx # Admin moderation panel
│   │   ├── AlumniDashboard.tsx# Alumni main dashboard
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── components/            # UI components
│   ├── contexts/              # React contexts (Auth)
│   ├── lib/                   # Utilities
│   └── main.tsx              # App entry point
│
├── package.json              # Frontend dependencies
└── vite.config.ts           # Vite configuration
```

---

## Key Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user

### Alumni
- `GET /api/jobs` - Fetch jobs
- `GET /api/events` - Fetch events
- `GET /api/posts` - Fetch posts
- `GET /api/connections/sent` - Sent requests
- `GET /api/connections/received` - Received requests
- `GET /api/directory` - Alumni directory
- `POST /api/posts` - Create post
- `POST /api/connections/send` - Send connection request

### Admin
- `GET /api/admin/moderation/posts` - Pending posts
- `GET /api/admin/applications` - Pending applications
- `GET /api/admin/analytics` - Analytics data
- `POST /api/admin/moderation/posts/{id}/approve` - Approve post
- `POST /api/admin/moderation/posts/{id}/deny` - Deny post
- `POST /api/admin/applications/{id}/approve` - Approve application

---

## Development Tips

### Hot Module Replacement (HMR)
- Frontend changes auto-refresh without full reload
- Backend changes require manual restart

### Debug Dashboard
- Open DevTools (F12)
- Network tab: Monitor API calls
- Console: Check for errors
- Application: View stored auth_token in localStorage

### Database
- Location: `server/prisma/dev.db` (SQLite)
- Run migrations: `npx prisma migrate dev`
- Seed data: `npx tsx seed.ts` (in server folder)

---

## Common Test Flows

### Flow 1: Register → Login → Create Post
1. Register as alumni
2. Login
3. Go to Dashboard
4. Click "Quick Post"
5. Enter title: "Job Opportunity"
6. Enter content: "Great opportunity available"
7. Click Post
8. ✅ Should see success message

### Flow 2: Admin Approve Post
1. Register/Login as admin
2. Go to Admin Dashboard
3. Check "Posts" tab
4. Click "Approve" on any pending post
5. ✅ Should see success message

### Flow 3: Send Connection Request
1. Login as alumni
2. Scroll to "People You May Know"
3. Click "Connect" on any person
4. ✅ Should see "Connection request sent!" message

---

## Performance Notes

- Frontend bundle: ~741 KB (gzip: ~209 KB)
- Build time: ~2-3 seconds
- Development server startup: ~1 second
- Full page load (with data): ~2-4 seconds

---

## Next Steps

1. ✅ Verify servers are running
2. ✅ Test login/register
3. ✅ Test dashboard loads correctly
4. ✅ Test post creation
5. ✅ Test admin moderation
6. ✅ Check console for errors
7. 📝 Document any issues found
8. 🚀 Ready for production deployment

---

## Support

If you encounter issues:
1. Check ERROR_FIXES_SUMMARY.md for known issues
2. Review backend logs for API errors
3. Check browser console for frontend errors
4. Verify all servers are running on correct ports
5. Clear browser cache and restart servers

---

**Last Updated:** 2024
**Status:** ✅ All critical errors fixed, ready for testing
