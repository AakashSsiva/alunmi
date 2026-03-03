# Alumni Platform - Quick Reference Card

## 🔗 Routes & Pages

### Alumni User Routes
| Page | URL | Purpose |
|------|-----|---------|
| Alumni Dashboard | `/alumni-dashboard` | Main feed, post creation, stats |
| Connections | `/connections` | Find alumni, manage requests |
| Messages | `/messages` | Chat with connected alumni |
| Settings | `/settings` | Profile & preferences |

### Admin Routes
| Page | URL | Purpose |
|------|-----|---------|
| Admin Dashboard | `/admin-dashboard` | Moderation, analytics, management |
| User Management | `/admin/users` | (API endpoint) |
| Event Management | `/admin/events` | (API endpoint) |

---

## 📌 Key API Endpoints

### Authentication
```
POST /api/auth/register - Create new user
POST /api/auth/login - Login user
```

### Posts & Moderation
```
POST /api/posts - Create post
GET /api/posts - Get all posts
GET /api/admin/moderation/posts - Get pending posts (admin only)
POST /api/admin/moderation/posts/:id/approve - Approve post (admin)
POST /api/admin/moderation/posts/:id/deny - Deny post (admin)
```

### Messaging
```
POST /api/messages/send - Send message
GET /api/messages/threads - Get conversations
GET /api/messages/conversation/:userId - Get chat history
POST /api/messages/:messageId/read - Mark as read
```

### Connections
```
POST /api/connections/request - Send request
GET /api/connections - Get connections
GET /api/connections/directory - Search alumni
GET /api/connections/requests/incoming - Get pending requests
POST /api/connections/request/:id/accept - Accept request
POST /api/connections/request/:id/reject - Reject request
```

### Notifications
```
GET /api/notifications - Get all notifications
GET /api/notifications/unread/count - Unread count
POST /api/notifications/:id/read - Mark as read
POST /api/notifications/read-all - Mark all as read
DELETE /api/notifications/:id - Delete notification
```

### Admin Analytics
```
GET /api/admin/analytics - Dashboard stats
GET /api/admin/applications - Pending applications
POST /api/admin/applications/:id/approve - Approve app
GET /api/admin/logs - Audit logs
```

---

## 🎨 UI Components Used

### Cards & Containers
- `<Card>` - Info containers
- `<CardHeader>` - Card titles
- `<CardContent>` - Card body
- `<CardTitle>` - Card heading

### Inputs & Forms
- `<Input>` - Text input
- `<Textarea>` - Multi-line text
- `<Button>` - Action button
- `<Select>` - Dropdown selector

### Navigation & Tabs
- `<Tabs>` - Tab container
- `<TabsList>` - Tab buttons
- `<TabsContent>` - Tab content

### Feedback & Display
- `<Badge>` - Status indicator
- `<Toast>` - Notifications
- `<Dialog>` - Modal

### Icons (Lucide React)
- `<FileText>` - Posts
- `<Users>` - Connections
- `<MessageSquare>` - Messages
- `<Bell>` - Notifications
- `<Check>` - Approve/Success
- `<X>` - Deny/Close
- `<Clock>` - Pending
- `<AlertCircle>` - Error/Denied

---

## 🗄️ Database Schema (Quick View)

### User Table
```
id (PK) | email | name | role | batch | isActive | profileImage
```

### Post Table
```
id (PK) | title | content | platform | status | authorId | adminFeedback
```

### Message Table
```
id (PK) | content | senderId | recipientId | isRead | readAt
```

### Notification Table
```
id (PK) | userId | type | title | message | isRead | relatedId
```

### Connection Table
```
id (PK) | userId | connectedUserId
```

### ConnectionRequest Table
```
id (PK) | senderId | recipientId | status
```

---

## 🔐 Authentication

### Login Flow
```javascript
// 1. User enters email & password
// 2. POST /api/auth/login
// 3. Backend verifies password with bcrypt
// 4. Returns JWT token
// 5. Frontend stores token in localStorage
// 6. Token sent in Authorization header on all requests
```

### Protected Routes
```javascript
// Middleware: requireAuth
// Checks: Authorization header has valid JWT
// Checks: Token hasn't expired
// Sets: req.userId, req.user

// Middleware: requireAdmin
// Checks: requireAuth passed
// Checks: user.role === 'ADMIN'
// Otherwise: 403 Forbidden
```

---

## 📊 Notification Types

| Type | Trigger | Message |
|------|---------|---------|
| `POST_APPROVED` | Admin approves post | "Your post was approved!" |
| `POST_DENIED` | Admin denies post | "Your post needs revision" |
| `CONNECTION_REQUEST` | Alumni sends request | "X wants to connect" |
| `CONNECTION_ACCEPTED` | Request accepted | "X accepted your request" |
| `MESSAGE` | New message received | "X: Hi there!" |
| `NEW_EVENT` | Admin creates event | "New event: X" |
| `APPLICATION_APPROVED` | App approved | "You were selected!" |
| `APPLICATION_REJECTED` | App rejected | "Application not approved" |

---

## ✨ Status Indicators

### Post Status
- ⏳ **PENDING** - Awaiting admin review
- ✅ **APPROVED** - Visible to all alumni
- ❌ **DENIED** - Rejected (author sees feedback)

### Connection Status
- 🔗 **CONNECTED** - Established connection
- ⏳ **PENDING** - Request sent, awaiting response
- ➕ **NONE** - No connection or request

### Message Status
- 📤 **Sent** - Message delivered
- ✓ **Delivered** - Recipient received
- ✓✓ **Read** - Recipient opened

---

## 🧪 Test Users

### Admin Account
```
Email: admin@example.com
Password: admin123
Role: ADMIN
```

### Alumni Account 1
```
Email: alumni1@example.com
Password: alumni123
Role: ALUMNI
```

### Alumni Account 2
```
Email: alumni2@example.com
Password: alumni123
Role: ALUMNI
```

---

## 🚀 Useful Commands

### Backend
```bash
cd server
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Run production build
npx prisma studio   # Open database GUI
npx prisma migrate  # Run migrations
```

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build locally
```

---

## 📱 Responsive Breakpoints

```typescript
// Mobile
max-w-full

// Tablet (md)
md:grid-cols-2

// Desktop (lg)
lg:grid-cols-3

// Large Desktop (xl)
xl:grid-cols-4
```

---

## 🎯 Most Useful Pages to Test

1. **Login Page** `/login`
   - Test authentication
   - Verify error handling

2. **Alumni Dashboard** `/alumni-dashboard`
   - Test post creation
   - Verify notification display
   - Check status indicators

3. **Admin Dashboard** `/admin-dashboard`
   - Test post moderation
   - Verify analytics
   - Check applications

4. **Connections** `/connections`
   - Test search functionality
   - Send connection request
   - Accept/reject requests

5. **Messages** `/messages`
   - Test real-time messaging
   - Check read status
   - Verify conversation list

---

## 🔍 Debugging Tips

### Check JWT Token
```javascript
// In browser console
console.log(localStorage.getItem('token'));
```

### View API Response
```javascript
// In DevTools Network tab
// Click on API call
// View Response tab
```

### Check Database
```bash
sqlite3 server/prisma/dev.db
.schema
SELECT * FROM User;
```

### Enable Debug Logs
```typescript
// In .env
DEBUG=*
```

---

## ⚡ Performance Tips

1. **Optimize Images**
   - Use profileImage for avatars
   - Compress before uploading

2. **Pagination**
   - Use limit/skip on large data sets
   - Load more on scroll

3. **Caching**
   - Cache user data in localStorage
   - Update on notification

4. **Database Indexes**
   - Already set on email, userId
   - Consider adding on frequently queried fields

---

## 📚 Files to Reference

| File | Purpose |
|------|---------|
| `/ALUMNI_PLATFORM_README.md` | Complete guide |
| `/IMPLEMENTATION_SUMMARY.md` | Technical details |
| `/TESTING_GUIDE.md` | Testing procedures |
| `/src/App.tsx` | Route definitions |
| `/server/src/routes/admin.ts` | Admin API |
| `/server/prisma/schema.prisma` | Database schema |

---

## 🎓 Learning Resources

### Technologies Used
- Express.js: https://expressjs.com
- Prisma: https://www.prisma.io
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com

### Related Concepts
- JWT Authentication
- RESTful API design
- Database relationships
- Role-based access control
- Real-time notifications

---

**Happy Building! 🚀**
