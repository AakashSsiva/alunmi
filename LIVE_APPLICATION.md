# 🎓 Adhiyamaan Connects - Live Application

## ✅ APPLICATION IS NOW RUNNING AND DISPLAYING

### 🌐 Access Points

**Frontend Application:** http://localhost:8080
**Backend API:** http://localhost:4000

---

## 📊 Server Status

### Backend Server ✅
- Status: Running
- URL: http://localhost:4000
- Health Check: http://localhost:4000/health
- Response: `{"status":"ok"}`

### Frontend Server ✅
- Status: Running
- URL: http://localhost:8080
- Framework: React 18 + Vite
- Build: 2163 modules compiled

---

## 🎯 What You Can Do

### Authentication
1. Go to http://localhost:8080
2. Click "Sign In" or "Join Network"
3. Create account or login with credentials

### Features Available
- ✅ Home Page - Landing page with navigation
- ✅ Dashboard - User dashboard (after login)
- ✅ Alumni Directory - Search and connect with alumni
- ✅ Events - View upcoming events
- ✅ Jobs - Browse job postings
- ✅ News - Stay updated with latest news
- ✅ Messaging - Direct messages with alumni
- ✅ Notifications - Get real-time notifications
- ✅ Connections - Build your network
- ✅ Settings - Update your profile

---

## 🔌 API Endpoints (Backend)

All endpoints are available at `http://localhost:4000/api/`

### Authentication
- POST `/auth/login` - Login with email/password
- POST `/auth/register` - Create new account

### Events
- GET `/events` - Get all events
- POST `/events` - Create new event
- PATCH `/events/:id/approve` - Approve event (admin)

### Jobs
- GET `/jobs` - Get job listings
- POST `/jobs` - Post new job (admin)

### Messages
- GET `/messages/threads` - Get message threads
- POST `/messages/send` - Send message
- GET `/messages/conversation/:userId` - Get conversation

### Notifications
- GET `/notifications` - Get user notifications
- POST `/notifications/:id/read` - Mark notification as read
- DELETE `/notifications` - Delete all notifications

### Admin
- GET `/admin/users` - Get all users (admin only)
- GET `/admin/events/pending` - Get pending events
- POST `/admin/moderation/posts/:postId/approve` - Approve post
- POST `/admin/moderation/posts/:postId/deny` - Deny post

---

## 🗂️ Project Structure

```
project-root/
├── index.html              # Main HTML entry point
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
├── src/                    # React source code
│   ├── pages/             # Page components
│   ├── components/        # Reusable components
│   ├── contexts/          # Auth context
│   ├── lib/               # Utilities & API
│   ├── App.tsx            # Main component
│   └── main.tsx           # Entry point
│
└── server/                # Node.js backend
    ├── src/
    │   ├── routes/        # API routes
    │   ├── middleware/    # Auth middleware
    │   └── index.ts       # Express server
    ├── prisma/
    │   ├── schema.prisma  # Database schema
    │   └── dev.db         # SQLite database
    └── dist/              # Compiled JS
```

---

## 🚀 Quick Start Commands

### Start Backend
```bash
cd server
npm start
# Backend runs on http://localhost:4000
```

### Start Frontend
```bash
npm run dev
# Frontend runs on http://localhost:8080
```

### Build Frontend
```bash
npm run build
# Creates optimized build in dist/
```

### Check Backend Health
```bash
curl http://localhost:4000/health
```

---

## 🔒 Authentication Flow

1. User visits http://localhost:8080
2. Clicks "Join Network" to register or "Sign In" to login
3. Sends credentials to `/api/auth/login` or `/api/auth/register`
4. Backend validates and returns JWT token
5. Token stored in localStorage
6. Token sent with every API request as `Authorization: Bearer <token>`
7. User redirected to dashboard on successful login

---

## 💾 Database

- **Type:** SQLite
- **Location:** `/server/prisma/dev.db`
- **ORM:** Prisma
- **Schema:** `/server/prisma/schema.prisma`

### Tables
- users
- posts
- events
- jobs
- messages
- notifications
- connections
- applications
- admin_actions

---

## 🐛 Troubleshooting

### Frontend Not Showing
- Check that backend is running: `curl http://localhost:4000/health`
- Frontend should be on **http://localhost:8080** (not 8081)
- Clear browser cache and refresh

### Backend Not Responding
- Ensure you're in the `server` directory
- Run `npm install` if not done yet
- Check that port 4000 is not in use: `lsof -i :4000`

### Port Already in Use
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

---

## ✨ Key Features Implemented

### Frontend
- ✅ React 18 with TypeScript
- ✅ Vite for fast dev server
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui components
- ✅ React Router for navigation
- ✅ Context API for state management
- ✅ Responsive design

### Backend
- ✅ Node.js + Express
- ✅ TypeScript
- ✅ Prisma ORM
- ✅ SQLite database
- ✅ JWT authentication
- ✅ CORS enabled
- ✅ RESTful API

---

## 📝 Notes

- Both frontend and backend compile **without any errors**
- Database is properly initialized and synced
- All routes are functional and tested
- CORS is enabled for local development
- Authentication tokens stored in localStorage
- All notifications are real-time capable

---

## 🎓 Adhiyamaan Connects

**An alumni networking platform for Adhiyamaan College of Engineering**

Connect with fellow alumni • Discover opportunities • Grow together

**Live at:** http://localhost:8080

---

*Application Status: ✅ FULLY OPERATIONAL*
*Last Updated: 5 February 2026*
