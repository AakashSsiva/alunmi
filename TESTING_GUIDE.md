# Alumni Platform - Quick Start Testing Guide

## 🚀 Getting Started

### 1. Start the Backend Server
```bash
cd server
npm install
npm run dev
```
Server runs on `http://localhost:4000`

### 2. Start the Frontend
```bash
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` (or similar)

### 3. Test Users (Create These First)

#### Admin User
- Email: `admin@alumni.com`
- Password: `Admin@123`
- Role: `ADMIN`

#### Alumni User 1
- Email: `alumni1@alumni.com`
- Password: `Alumni@123`
- Role: `ALUMNI`

#### Alumni User 2
- Email: `alumni2@alumni.com`
- Password: `Alumni@123`
- Role: `ALUMNI`

## 📱 Feature Testing Workflow

### Test 1: Post Creation & Approval

**Step 1: Create Post (as Alumni)**
1. Login as `alumni1@alumni.com`
2. Navigate to `/alumni-dashboard`
3. In "Dashboard" tab, fill the post form:
   - Title: "Looking for a React Developer"
   - Content: "My startup is hiring..."
   - Platform: "Jobs"
4. Click "Post"
5. ✅ Post appears in "My Posts" with ⏳ PENDING status

**Step 2: Review Post (as Admin)**
1. Login as `admin@alumni.com`
2. Navigate to `/admin-dashboard`
3. Click "Posts" tab
4. Find the pending post
5. Click either "Approve" or "Deny"
   - If Approve: Post status changes to ✅ APPROVED
   - If Deny: Add feedback and submit
6. ✅ Author receives notification

**Step 3: Verify Post Update (as Alumni)**
1. Switch back to `alumni1@alumni.com`
2. Go to `/alumni-dashboard`
3. Click "Notifications" tab
4. ✅ See notification about post status
5. Go to "My Posts" tab
6. ✅ Post now shows APPROVED or DENIED status

---

### Test 2: Connection Requests

**Step 1: Send Request**
1. Login as `alumni1@alumni.com`
2. Navigate to `/connections`
3. Click "Discover" tab
4. Find `alumni2@alumni.com` in the list
5. Click "Connect" button
6. ✅ Button changes to "Request Sent"

**Step 2: Receive & Review Request**
1. Switch to `alumni2@alumni.com`
2. Navigate to `/connections`
3. Click "Requests" tab
4. ✅ See incoming request from alumni1
5. Click "✓" to accept or "✗" to reject
6. ✅ Request is processed

**Step 3: Verify Connection**
1. Switch to `alumni1@alumni.com`
2. Go to `/connections`
3. Click "Connected" tab
4. ✅ See `alumni2` in connections list
5. Switch to `alumni2@alumni.com`
6. Go to `/connections`
7. ✅ See `alumni1` in connections list

---

### Test 3: Messaging

**Step 1: Send Message**
1. Login as `alumni1@alumni.com`
2. Navigate to `/messages`
3. If no conversations exist, go to `/connections`
4. Find alumni2 in "Connected" tab
5. Click "Send Message" (if available)
6. Or go back to `/messages` and select conversation
7. Type message: "Hi! Great to connect with you"
8. Click send button
9. ✅ Message appears immediately in chat

**Step 2: Receive Message**
1. Switch to `alumni2@alumni.com`
2. Navigate to `/messages`
3. ✅ See `alumni1` conversation with unread indicator
4. Click conversation
5. ✅ Message appears
6. Message auto-marks as read

**Step 3: Reply**
1. Type response: "Thanks for reaching out!"
2. Click send
3. ✅ Message appears in chat
4. Switch to alumni1
5. ✅ See new message immediately

---

### Test 4: Admin Analytics

**Step 1: View Dashboard**
1. Login as `admin@alumni.com`
2. Navigate to `/admin-dashboard`
3. ✅ See 4 analytics cards:
   - Total Alumni (count of active alumni)
   - Active Users (logged in last 7 days)
   - Pending Posts (posts awaiting review)
   - Total Posts (all approved posts)

**Step 2: View Posts Tab**
1. Click "Posts" tab
2. ✅ See list of pending posts
3. For each post:
   - Author name and email
   - Post title and content
   - Status badge
   - Approve/Deny buttons

**Step 3: View Analytics Tab**
1. Click "Analytics" tab
2. ✅ See:
   - Platform Distribution (Jobs/Events/Announcement/Mentorship)
   - Upcoming Events list

---

### Test 5: Notifications

**Step 1: Generate Notifications**
- Create multiple posts (as alumni)
- Admin approves/denies posts
- Send connection requests
- Exchange messages

**Step 2: View Notifications**
1. Login as `alumni1@alumni.com`
2. Navigate to `/alumni-dashboard`
3. Click "Notifications" tab
4. ✅ See all notifications with:
   - Title (e.g., "Your post was approved!")
   - Message content
   - Timestamp
   - Unread indicator (blue dot)

**Step 3: Mark as Read**
1. Click on a notification (if interactive)
2. ✅ Unread indicator disappears
3. Or use bulk "Mark all as read" if available

---

### Test 6: Alumni Directory Search

**Step 1: Search by Name**
1. Login as any alumni
2. Navigate to `/connections`
3. Click "Discover" tab
4. In search box, type name: "alumni2"
5. ✅ Results filter to matching alumni
6. Clear and try another name

**Step 2: Search by Batch**
1. Type batch year: "2020"
2. ✅ Results filter to that graduation year
3. Try "2019", "2021", etc.

**Step 3: View Profile Cards**
1. For each alumni card:
   - ✅ See profile image
   - ✅ See name
   - ✅ See batch/graduation year
   - ✅ See bio (if available)
   - ✅ See connection status button

---

## 🔍 API Testing (with Tools like Postman)

### Test Authentication
```
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "alumni1@alumni.com",
  "password": "Alumni@123"
}

Response:
{
  "token": "eyJhbGc...",
  "user": { ... }
}
```

### Test Create Post
```
POST http://localhost:4000/api/posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Senior Developer Position",
  "content": "We're hiring senior developers...",
  "platform": "Jobs"
}

Response:
{
  "id": 1,
  "status": "PENDING",
  ...
}
```

### Test Approve Post (Admin)
```
POST http://localhost:4000/api/admin/moderation/posts/1/approve
Authorization: Bearer {admin_token}

Response:
{
  "success": true,
  "post": { "id": 1, "status": "APPROVED" }
}
```

### Test Send Message
```
POST http://localhost:4000/api/messages/send
Authorization: Bearer {token}
Content-Type: application/json

{
  "recipientId": 2,
  "content": "Hi there!"
}

Response:
{
  "id": 1,
  "content": "Hi there!",
  "createdAt": "2024-..."
}
```

### Test Get Notifications
```
GET http://localhost:4000/api/notifications
Authorization: Bearer {token}

Response:
[
  {
    "id": 1,
    "type": "POST_APPROVED",
    "title": "Your post was approved!",
    "isRead": false,
    "createdAt": "2024-..."
  }
]
```

---

## 📊 Data Verification

### Check Database Directly
```bash
# Open SQLite database
sqlite3 server/prisma/dev.db

# View users
SELECT * FROM User;

# View posts
SELECT * FROM Post;

# View messages
SELECT * FROM Message;

# View notifications
SELECT * FROM Notification;

# View connections
SELECT * FROM Connection;
```

---

## ✅ Testing Checklist

### Authentication
- [ ] Register new alumni user
- [ ] Login with correct credentials
- [ ] Fail to login with wrong password
- [ ] Login as admin user

### Posts & Moderation
- [ ] Create post as alumni
- [ ] Post appears as PENDING
- [ ] Admin can view pending posts
- [ ] Admin can approve post
- [ ] Admin can deny post with feedback
- [ ] Author receives notification
- [ ] Post status updates in alumni dashboard

### Connections
- [ ] Search alumni directory
- [ ] Send connection request
- [ ] Receive request notification
- [ ] Accept connection request
- [ ] View connections list
- [ ] Both users see each other as connected

### Messaging
- [ ] Start conversation with connected user
- [ ] Send message
- [ ] Message appears immediately
- [ ] Recipient sees unread indicator
- [ ] Message marks as read when opened
- [ ] See conversation history

### Admin Features
- [ ] View analytics dashboard
- [ ] See pending posts count
- [ ] See total alumni count
- [ ] View applications pending
- [ ] Create event
- [ ] View event list

### Notifications
- [ ] Receive post approval notification
- [ ] Receive connection request notification
- [ ] Receive message notification
- [ ] View all notifications
- [ ] Mark notification as read
- [ ] Clear all notifications

---

## 🐛 Common Issues & Fixes

### Posts not showing PENDING status
- Ensure admin.ts has moderation routes
- Check database Post model has status field
- Verify JWT token is valid

### Connection requests not sending
- Check Prisma schema has ConnectionRequest model
- Verify routes/connections.ts exists
- Check user IDs are correct

### Messages not appearing
- Ensure messages.ts routes are registered
- Check Message model has senderId/recipientId
- Verify recipient user exists

### Admin features not working
- Verify user has ADMIN role
- Check requireAdmin middleware is applied
- Check JWT token includes role

---

## 💡 Tips for Testing

1. **Use Multiple Browsers**: Test with multiple alumni in different browser windows
2. **Check DevTools**: Look at Network tab to verify API calls
3. **Watch Logs**: Check terminal for backend errors
4. **Clear Cache**: Use incognito mode if having auth issues
5. **Reset Data**: Delete dev.db and run migrations if needed
6. **Test Edge Cases**: 
   - Send request to already connected user
   - Try to approve own post as alumni
   - Send message to non-existent user

---

## 🎯 Success Criteria

Your implementation is working correctly when:
- ✅ Alumni can create posts that go to PENDING status
- ✅ Admin can approve/deny posts with feedback
- ✅ Authors get notifications of post status
- ✅ Alumni can send and accept connection requests
- ✅ Connected alumni can message each other
- ✅ Admin dashboard shows correct analytics
- ✅ All notifications appear correctly
- ✅ Database stores all data properly

---

**Happy Testing! 🎉**
