# 🏟️ BookMyCourt — Online Sports Arena Booking System

> A web-based platform to discover, browse, and book sports arenas for cricket, football, padel, badminton, futsal, and more — replacing phone calls and walk-ins with a seamless online experience.

---

## 📖 Project Overview

**BookMyCourt** is a full-stack web application that centralizes sports arena booking. Players can browse arenas by sport, check real-time slot availability, and make instant bookings. Arena owners get a dedicated dashboard to manage courts, update availability, and track their bookings. The platform eliminates scheduling conflicts, manual coordination, and lack of transparency common in traditional booking methods.

**Live Demo:** _Coming soon_  
**GitHub:** [https://github.com/saadi755/project](#)  
**Jira Board:** [Project Tracker](#)

---

## 👥 Authors

| Name | Roll No | Role |
|------|---------|------|
| Baqir Zaidi | 24L0601 | Group Leader |
| Hasan Shaigan | 24L0621 | Member |
| Ayyan Khan | 24L0912 | Member |
| Sohaib Irshad | 24L0679 | Member |
| Saadi Bhatti | 24L0704 | Member |

**Course Instructor:** Sir Zeeshan Nazar  
**Institution:** National University of Computer and Emerging Sciences (FAST-NUCES), Lahore

---

## 🗂️ Folder Hierarchy

```
BookMyCourt/
│
├── bookmycourt-frontend/          # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api.js                 # Centralized API helper
│   │   ├── App.jsx                # Root component
│   │   ├── BookMyCourt.jsx        # Main application shell
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Arena/
│   │   │   │   ├── ArenaList.jsx
│   │   │   │   ├── ArenaCard.jsx
│   │   │   │   ├── ArenaDetail.jsx
│   │   │   │   └── AvailabilityCalendar.jsx
│   │   │   ├── Booking/
│   │   │   │   ├── BookingForm.jsx
│   │   │   │   ├── BookingConfirmation.jsx
│   │   │   │   └── MyBookings.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── OwnerDashboard.jsx
│   │   │   │   └── PlayerDashboard.jsx
│   │   │   ├── Notifications/
│   │   │   │   └── NotificationPanel.jsx
│   │   │   └── Shared/
│   │   │       ├── Navbar.jsx
│   │   │       └── Footer.jsx
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── bookmycourt-backend/           # Express.js + MongoDB backend
│   ├── server.js                  # Entry point
│   ├── .env.example               # Environment template
│   ├── package.json
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── models/
│   │   ├── User.js                # User schema (player/owner)
│   │   ├── Arena.js               # Arena + courts + deals
│   │   ├── Booking.js             # Bookings + reviews
│   │   └── Notification.js        # Notifications
│   ├── routes/
│   │   ├── auth.js                # Register, login, profile
│   │   ├── arenas.js              # Arena CRUD + availability
│   │   ├── bookings.js            # Bookings + cancel + review
│   │   └── notifications.js       # Notification management
│   ├── middleware/
│   │   ├── auth.js                # JWT protect + role authorize
│   │   └── errorHandler.js        # Global error handler
│   ├── utils/
│   │   └── sendToken.js           # JWT generator
│   └── seed/
│       └── index.js               # Demo data seeder
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **API Style** | RESTful API |
| **Version Control** | Git & GitHub |
| **Project Management** | Jira |
| **Deployment (Backend)** | Railway / Render |
| **Deployment (Frontend)** | Vercel / Netlify |
| **Database Hosting** | MongoDB Atlas (Free M0 Cluster) |

---

## ⚙️ Installation and Setup Instructions

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Community](https://www.mongodb.com/try/download/community) _(or use MongoDB Atlas cloud)_
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/<your-username>/BookMyCourt.git
cd BookMyCourt
```

### Backend Setup

```bash
cd bookmycourt-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

Edit the `.env` file and fill in:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
PORT=5000
```

**MongoDB Options:**
- **Local:** Install MongoDB Community from https://www.mongodb.com/try/download/community
- **Cloud (recommended):** Create a free cluster at https://cloud.mongodb.com → get connection string → paste as `MONGO_URI`

### Seed Demo Data

```bash
npm run seed
```

### Frontend Setup

```bash
cd ../bookmycourt-frontend

# Install dependencies
npm install
```

---

## ▶️ How to Run the Project

### Start the Backend Server

```bash
cd bookmycourt-backend

npm run dev      # Development mode (auto-restart with nodemon)
npm start        # Production mode
```

Backend runs at: `http://localhost:5000`

### Start the Frontend

```bash
cd bookmycourt-frontend

npm start        # Starts React dev server
```

Frontend runs at: `http://localhost:3000`

> Make sure both servers are running simultaneously for full functionality.

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Arena Owner | owner@bookmycourt.com | owner123 |
| Player | player@bookmycourt.com | player123 |

---

## ✨ Features

### 🔐 1. User Registration & Login
Players and arena owners can register and log in with their credentials. Role-based access (Player / Arena Owner) is assigned at registration and enforced throughout the application via JWT authentication.

### 🔍 2. Browse Arenas by Sport
Players can view a full listing of all available sports arenas. Arenas can be filtered by sport type — Cricket, Football, Padel, Badminton, Futsal, and more — making it easy to find the right venue.

### 📋 3. View Arena Details
Each arena has a dedicated detail page showing its name, location, available courts, supported sports, pricing, images, and user reviews — giving players all the information they need before booking.

### 📅 4. Check Real-Time Slot Availability
Players can select a date and instantly see which time slots are available or already booked for a specific arena and court. Availability is updated in real-time upon every booking or cancellation.

### 📝 5. Book an Arena
Authenticated players can select a court, choose an available time slot, and confirm a booking. A unique booking ID (e.g., `#BMC-00123`) is generated upon confirmation and displayed to the user.

### 💸 6. Deals & Discounts
Arena owners can attach promotional deals to their arenas. During booking, applicable deals are automatically detected and discounts are calculated and shown to the player before final confirmation.

### ❌ 7. Cancel a Booking
Players can cancel their confirmed bookings. Once cancelled, the time slot is released and becomes available for other players to book.

### ⭐ 8. Rate & Review Arenas
After completing a booking, players can submit a rating (1–5 stars) and a written review for the arena. Reviews are visible to other users on the arena detail page to help with decision-making.

### 🏟️ 9. Arena Owner Dashboard
Arena owners have access to a dedicated dashboard where they can view all bookings made for their arenas, monitor occupancy, and get a summary of their venue activity.

### ➕ 10. Create & Manage Arenas
Arena owners can create new arena listings by providing the name, location, sport types, court details, and pricing. Existing listings can be updated at any time.

### 🔧 11. Manage Courts
Within each arena, owners can add new courts and toggle individual court status (active / inactive) — for example, marking a court as unavailable during maintenance.

### 👤 12. Update Profile & Password
Logged-in users (both players and owners) can update their profile information such as name and email address, and change their account password at any time.

### 🔑 13. Forgot Password / Password Reset
Users who forget their password can request a reset email. A secure link is sent to their registered email address to set a new password.

### 🔔 14. In-App Notifications
Users receive real-time notifications for key events — booking confirmations, cancellations, new reviews, and owner updates. Notifications can be individually or collectively marked as read, and deleted when no longer needed.

### 🗓️ 15. My Bookings — Booking History
Players can view a complete history of their past and upcoming bookings, including arena name, sport, court, date, time slot, price, deal applied, and current booking status.

### 📊 16. Booking Confirmation Display
After a successful booking, a clean confirmation screen displays all booking details — arena, court, sport, date, time, price paid, and the unique booking reference number.

### 🔄 17. Availability Auto-Refresh
When a booking or cancellation is made, the availability calendar for that arena and date is automatically refreshed, preventing double bookings and ensuring accurate slot data at all times.

### 🔒 18. Role-Based Access Control
The system enforces strict role-based permissions. Players can only create bookings and submit reviews. Arena owners can only manage their own arenas and courts. Protected API routes reject unauthorized access.

### 🌐 19. Sport-Type Filtering
The arena listing page allows players to filter arenas by specific sport type using query parameters, narrowing down results to only venues that support the sport they want to play.

### 📬 20. Booking Request Notifications for Owners
Arena owners receive an in-app notification whenever a new booking is made or cancelled for one of their arenas, keeping them informed without needing to manually check their dashboard.

---

## ⚠️ Limitations

- **No online payment integration:** Payments are handled offline (cash at venue). Online payment gateways (Stripe, PayPal, JazzCash, etc.) are outside the current project scope.
- **No mobile application:** BookMyCourt is a web-only platform. A native iOS or Android application is not included in this version.
- **No advanced analytics:** Arena owners cannot view detailed revenue reports, occupancy graphs, or trend analytics in this version.
- **No real-time chat:** Players and arena owners cannot communicate directly through the platform.
- **No email notifications:** All notifications are in-app only. Email delivery of booking confirmations or reminders is not implemented.
- **No map/GPS integration:** Arenas are listed with address text only. Interactive maps or GPS-based nearby-search features are not included.
- **Single timezone support:** The application assumes all bookings are in the local timezone of the server. Multi-timezone support is not implemented.

---

## 🧱 SOLID Principles Implemented

| Principle | Description | Where Applied |
|-----------|-------------|---------------|
| **S** — Single Responsibility | Each model, route, and middleware handles one concern only | `User.js`, `Arena.js`, `Booking.js`, `Notification.js` are separate models; routes are split by domain |
| **O** — Open/Closed | Routes and middleware are open for extension (new endpoints) without modifying existing handlers | Adding new routes without touching existing route files |
| **L** — Liskov Substitution | Both Player and Owner are subtypes of User and can be substituted wherever a User is expected | `User.js` schema with `role` field used across auth and booking logic |
| **I** — Interface Segregation | Separate route files for auth, arenas, bookings, and notifications — clients only interact with what they need | `routes/auth.js`, `routes/arenas.js`, `routes/bookings.js`, `routes/notifications.js` |
| **D** — Dependency Inversion | High-level modules (routes) depend on abstractions (models, middleware) not concrete implementations | Routes depend on Mongoose models and `auth.js` middleware, not on raw DB logic |

---

## 🎨 Design Patterns Implemented

| Pattern | Description | Where Applied |
|---------|-------------|---------------|
| **MVC (Model-View-Controller)** | Separates data (Models), presentation (React frontend), and logic (Express routes/controllers) | Overall project architecture |
| **Repository Pattern** | Data access logic is encapsulated in Mongoose models, keeping routes clean | `models/` folder |
| **Middleware Pattern** | Cross-cutting concerns (auth, error handling) are handled via Express middleware chain | `middleware/auth.js`, `middleware/errorHandler.js` |
| **Factory Pattern** | JWT token creation is abstracted into a utility function | `utils/sendToken.js` |
| **Observer Pattern** | Notification system triggers updates across the app when booking events occur | `routes/bookings.js` → creates `Notification` records on booking/cancel |
| **Singleton Pattern** | MongoDB connection is established once and reused across the application | `config/db.js` |

---

## 📡 API Endpoints Reference

### Auth
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/auth/me` | ✅ | Get current user |
| POST | `/api/auth/forgot-password` | ❌ | Send password reset email |
| PATCH | `/api/auth/update-profile` | ✅ | Update name/email |
| PATCH | `/api/auth/update-password` | ✅ | Change password |

### Arenas
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/arenas` | ❌ | List all arenas (`?sport=FOOTBALL`) |
| GET | `/api/arenas/:id` | ❌ | Get arena details |
| GET | `/api/arenas/:id/availability?date=YYYY-MM-DD` | ❌ | Get available/booked slots |
| POST | `/api/arenas` | 🔑 Owner only | Create arena |
| PATCH | `/api/arenas/:id` | 🔑 Owner only | Update arena |
| POST | `/api/arenas/:id/courts` | 🔑 Owner only | Add court to arena |
| PATCH | `/api/arenas/:id/courts/:courtId` | 🔑 Owner only | Toggle court status |

### Bookings
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/bookings` | ✅ | Get my bookings |
| POST | `/api/bookings` | 🔑 Player only | Create a new booking |
| GET | `/api/bookings/:id` | ✅ | Get booking detail |
| PATCH | `/api/bookings/:id/cancel` | ✅ | Cancel a booking |
| POST | `/api/bookings/:id/review` | 🔑 Player only | Submit review |

### Notifications
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/notifications` | ✅ | Get my notifications |
| PATCH | `/api/notifications/:id/read` | ✅ | Mark one as read |
| PATCH | `/api/notifications/read-all` | ✅ | Mark all as read |
| DELETE | `/api/notifications/:id` | ✅ | Delete a notification |

---

## 🔌 Frontend–Backend Integration

### Step 1 — `api.js` Helper (place in `src/`)

```js
// src/api.js
const BASE = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("bmc_token");

const headers = () => ({
  "Content-Type": "application/json",
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

export const api = {
  // Auth
  login: (email, password) =>
    fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json()),

  register: (name, email, password) =>
    fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ name, email, password }),
    }).then((r) => r.json()),

  me: () =>
    fetch(`${BASE}/auth/me`, { headers: headers() }).then((r) => r.json()),

  // Arenas
  getArenas: (sport) =>
    fetch(`${BASE}/arenas${sport ? `?sport=${sport}` : ""}`, {
      headers: headers(),
    }).then((r) => r.json()),

  getArena: (id) =>
    fetch(`${BASE}/arenas/${id}`, { headers: headers() }).then((r) => r.json()),

  getAvailability: (arenaId, date) =>
    fetch(`${BASE}/arenas/${arenaId}/availability?date=${date}`, {
      headers: headers(),
    }).then((r) => r.json()),

  // Bookings
  getBookings: () =>
    fetch(`${BASE}/bookings`, { headers: headers() }).then((r) => r.json()),

  createBooking: (data) =>
    fetch(`${BASE}/bookings`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  cancelBooking: (id) =>
    fetch(`${BASE}/bookings/${id}/cancel`, {
      method: "PATCH",
      headers: headers(),
    }).then((r) => r.json()),

  submitReview: (id, rating, comment) =>
    fetch(`${BASE}/bookings/${id}/review`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ rating, comment }),
    }).then((r) => r.json()),

  // Notifications
  getNotifications: () =>
    fetch(`${BASE}/notifications`, { headers: headers() }).then((r) => r.json()),

  markRead: (id) =>
    fetch(`${BASE}/notifications/${id}/read`, {
      method: "PATCH",
      headers: headers(),
    }).then((r) => r.json()),

  markAllRead: () =>
    fetch(`${BASE}/notifications/read-all`, {
      method: "PATCH",
      headers: headers(),
    }).then((r) => r.json()),

  deleteNotif: (id) =>
    fetch(`${BASE}/notifications/${id}`, {
      method: "DELETE",
      headers: headers(),
    }).then((r) => r.json()),
};
```

### Step 2 — Connect Login

```js
// In BookMyCourt.jsx — replace handleLogin mock
const handleLogin = async (email, password) => {
  const res = await api.login(email, password);
  if (res.success) {
    localStorage.setItem("bmc_token", res.token);
    setUser(res.user); // { id, name, email, role }
  } else {
    setError(res.message);
  }
};
```

### Step 3 — Load Arenas on Mount

```js
useEffect(() => {
  api.getArenas().then((res) => {
    if (res.success) setArenas(res.arenas);
  });
}, []);
```

### Step 4 — Create Booking

```js
const handleBook = async () => {
  const res = await api.createBooking({
    arenaId: arena._id,
    courtId: selectedCourt._id,
    courtName: selectedCourt.name,
    sport: selectedSport,
    date: selectedDate,
    timeSlot: slot,
    totalPrice: finalPrice,
    dealApplied: activeDeal?.title,
    discountAmount: savings,
  });
  if (res.success) {
    setBookingId(res.booking.bookingId); // e.g. #BMC-00123
  }
};
```

---

## 🚢 Deployment

### Backend → Railway or Render
1. Push backend code to GitHub
2. Create account at [railway.app](https://railway.app) or [render.com](https://render.com)
3. Connect your GitHub repo
4. Set environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`
5. Deploy — Railway/Render will auto-detect Node.js

### Database → MongoDB Atlas (Free)
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create free M0 cluster
2. Add your IP to the whitelist (use `0.0.0.0/0` for public access)
3. Create a database user → get connection string
4. Set it as `MONGO_URI` in your deployment environment variables

### Frontend → Vercel or Netlify
1. Push React code to GitHub
2. Import to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com)
3. Update `BASE` in `src/api.js` to point to your Railway/Render backend URL
4. Deploy

---

## 📚 References

1. MDN Web Docs — Introduction to Web Development
2. [React Official Documentation](https://react.dev)
3. [Node.js Official Documentation](https://nodejs.org/en/docs)
4. [MongoDB Documentation](https://www.mongodb.com/docs)
5. [Express.js Documentation](https://expressjs.com)
6. [Mongoose ODM Documentation](https://mongoosejs.com/docs)
7. [JWT.io — JSON Web Tokens](https://jwt.io)

---

> **BookMyCourt** — Developed as part of the Software Engineering course at FAST-NUCES Lahore, 2025–2026.

