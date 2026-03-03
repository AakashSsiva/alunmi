# 🎓 Adhiyamaan Connects - Login Guide

## ✅ APPLICATION IS NOW FULLY OPERATIONAL

Both frontend and backend servers are running without errors!

---

## 🌐 Access Points

- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:4000

---

## 🔐 Login Credentials

### Admin Account (Full Access)
```
Email: admin@example.com
Password: admin123
```

### Test User (Alumni)
You can register a new account by clicking "Join Network" on the home page.

Example:
- Email: alumni@example.com
- Password: yourpassword123

---

## 🚀 Quick Start

1. **Open Application:**
   ```
   http://localhost:8080
   ```

2. **Login with Admin Account:**
   - Click "Sign In"
   - Email: `admin@example.com`
   - Password: `admin123`
   - Click "Sign In"

3. **Or Register New Account:**
   - Click "Join Network"
   - Fill in your details
   - Create account
   - Login

---

## 📊 Pre-loaded Test Data

The database has been seeded with:

### Events
- ✅ Alumni Meetup (Type: MEETUP)
- ✅ Tech Talk (Type: WEBINAR)

### Jobs
- ✅ Frontend Engineer - Acme (Remote)
- ✅ Backend Engineer - Beta (Chennai)

### News
- ✅ Campus Renovation
- ✅ Alumni Spotlight

---

## 🎯 Features You Can Test

### As Admin (admin@example.com)
- ✅ View admin dashboard
- ✅ Moderate posts
- ✅ Manage events
- ✅ View analytics
- ✅ Manage users
- ✅ View all applications

### As Alumni
- ✅ View profile
- ✅ Browse directory
- ✅ View events
- ✅ Browse jobs
- ✅ Send messages
- ✅ Get notifications
- ✅ Build network
- ✅ Post announcements

---

## 🔍 Test the API

### Health Check
```bash
curl http://localhost:4000/health
# Response: {"status":"ok"}
```

### Login API
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Get Profile (requires token)
```bash
curl http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📁 Project Structure

```
adhiyamaan-connects-main 2/
├── src/                      # Frontend (React)
│   ├── pages/               # Page components
│   ├── components/          # UI components
│   ├── contexts/            # Auth context
│   └── lib/                 # Utilities
│
└── server/                  # Backend (Node.js)
    ├── src/
    │   ├── routes/          # API routes
    │   ├── middleware/      # Auth middleware
    │   └── index.ts         # Express server
    ├── prisma/
    │   ├── schema.prisma    # Database schema
    │   ├── seed.ts          # Seed script
    │   └── dev.db           # SQLite database
    └── dist/                # Compiled code
```

---

## 🛠️ How to Run

### Terminal 1 - Backend Server
```bash
cd server
npm start
# Runs on http://localhost:4000
```

### Terminal 2 - Frontend Server
```bash
npm run dev
# Runs on http://localhost:8080
```

---

## 🐛 Troubleshooting

### Login Failed
- Make sure backend is running: `curl http://localhost:4000/health`
- Check you're using correct credentials
- Clear browser cache and refresh

### Backend Not Starting
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Restart
npm start
```

### Frontend Not Loading
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Restart
npm run dev
```

### Database Issues
```bash
# Reset database
rm server/prisma/dev.db

# Re-seed
cd server
npx prisma db push
npm run prisma:seed
```

---

## 🔄 Database Schema

### User Model
- id, name, email, passwordHash
- role (ADMIN, ALUMNI)
- Profile fields (department, graduationYear, company, position, etc.)

### Event Model
- id, title, description, date, location
- eventType (WEBINAR, MEETUP, JOB_DRIVE, WORKSHOP)
- capacity, registrations

### Post Model
- id, title, content, platform
- status (PENDING, APPROVED, DENIED)
- authorId, adminFeedback

### Message Model
- id, content, senderId, receiverId
- createdAt, isRead

### Notification Model
- id, type, title, message
- userId, isRead, relatedId

---

## ✨ Success Indicators

You'll know the application is working when:

1. ✅ Homepage displays with logo and navigation
2. ✅ You can click "Sign In" and see login form
3. ✅ Login with admin@example.com / admin123 succeeds
4. ✅ Dashboard loads after login
5. ✅ You can navigate to different pages
6. ✅ Events, Jobs, News load with test data
7. ✅ Can send messages to other users
8. ✅ Receive notifications
9. ✅ Backend API responds to requests

---

## 📝 API Endpoints

### Auth
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event
- `GET /api/events/:id` - Event details
- `PATCH /api/events/:id/approve` - Approve event

### Messages
- `POST /api/messages/send` - Send message
- `GET /api/messages/threads` - Message threads
- `GET /api/messages/conversation/:userId` - Chat with user

### Notifications
- `GET /api/notifications` - Get notifications
- `POST /api/notifications/:id/read` - Mark read
- `DELETE /api/notifications` - Clear all

---

## 🎓 **Ready to Use!**

Login with:
- **Email:** admin@example.com  
- **Password:** admin123

**Access at:** http://localhost:8080

Enjoy using Adhiyamaan Connects! 🚀

---

*Last Updated: 5 February 2026*
