<div align="center">

# 🔧 ToolShare

**A community-driven platform for sharing tools with your neighbours.**

*Connecting communities · Promoting sustainability · Declutter and earn*

---

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://mongodb.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-11-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Pages & Navigation](#-pages--navigation)
- [Architecture Overview](#-architecture-overview)
- [Security](#-security)
- [The Team](#-the-team)

---

## 🌱 About the Project

**ToolShare** is a full-stack web application that lets residents within a community lend and borrow tools without the need to buy them outright. Got a power drill gathering dust? List it. Need a ladder for the weekend? Borrow one from a neighbour.

The platform handles the entire lifecycle of a tool rental — listing, discovering, renting, renewing, returning — all within a clean, dark-mode-ready interface.

---

## ✨ Features

### For Borrowers
- 🔍 **Explore** the community tool catalogue with a responsive card grid
- 🔎 **Search** tools by name or description in real time
- 📄 **View** full tool details — price per day, owner flat number, availability, and quantity
- 🛠️ **Rent** a tool with a single click (7-day borrow period auto-assigned)
- 🔄 **Renew** a tool rental to extend your borrow period
- ↩️ **Return** a tool when done
- 🔖 **Save** tools to a personal watchlist for later

### For Lenders
- ➕ **Register a tool** with a name, description, price, maximum quantity, and an image
- 🗂️ **Manage registered tools** — edit details or delete listings via an in-place modal
- 👥 **See who currently has your tools** — borrower names, emails, flat numbers, and phone numbers are all visible from your dashboard

### General
- 🔐 **Email & password authentication** with secure httpOnly cookie sessions
- 🟢 **Google OAuth sign-in** powered by Firebase Authentication
- 🌓 **Dark mode** toggle, persisted across sessions
- 👤 **Profile management** — update name, email, flat number, phone, and profile picture (uploaded to Firebase Storage with a live circular progress indicator)
- 📱 **Responsive layout** — works on mobile, tablet, and desktop
- 🔔 **Toast notifications** for every user action
- 🚀 **Error Boundary** — graceful fallback UI instead of blank white screens

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| **Node.js + Express.js** | REST API server |
| **MongoDB Atlas + Mongoose** | Database and ODM |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **bcryptjs** | Password hashing |
| **Helmet.js** | HTTP security headers |
| **express-rate-limit** | Rate limiting (100 req / 15 min per IP) |
| **Multer** | Multipart file upload handling |
| **cookie-parser** | Cookie parsing middleware |
| **CORS** | Cross-Origin Resource Sharing |
| **dotenv** | Environment variable management |
| **nodemon** | Dev auto-restart |

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **Vite 6 + SWC** | Build tool and dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **Flowbite-React** | Pre-built UI component library |
| **React Router DOM v7** | Client-side routing |
| **Redux Toolkit + redux-persist** | Global state management with persistence |
| **Firebase 11** | Google authentication + profile image storage |
| **react-hot-toast** | Notification toasts |
| **react-icons** | Icon set |
| **react-circular-progressbar** | Image upload progress indicator |
| **browser-image-compression** | Client-side image compression before upload |

---

## 📁 Project Structure

```
ToolShare/
├── backend/
│   ├── index.js                  # Express app entry point
│   ├── controllers/
│   │   ├── ToolController.js     # All tool business logic
│   │   └── UserController.js     # Auth, registration, profile logic
│   ├── middleware/
│   │   ├── auth.js               # JWT verification (verifyToken, optionalAuth)
│   │   └── error.js              # Centralised error handler
│   ├── models/
│   │   ├── Tool.js               # Tool Mongoose model (OOP class)
│   │   └── User.js               # User Mongoose model (OOP class)
│   ├── routes/
│   │   ├── toolRoutes.js         # /api/tools/* routes
│   │   └── userRoutes.js         # /api/users/* routes
│   └── services/                 # (reserved for future service layer)
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx               # Root component, routing, error boundary
│       ├── firebase.js           # Firebase app initialisation
│       ├── main.jsx              # ReactDOM entry point
│       ├── components/
│       │   ├── Header.jsx        # Nav bar with search, dark mode, user menu
│       │   ├── Sidebar.jsx       # Slide-out navigation sidebar
│       │   ├── Footer.jsx        # Page footer
│       │   ├── ToolCard.jsx      # Reusable tool card component
│       │   ├── OAuth.jsx         # Google sign-in button
│       │   ├── PrivateRoute.jsx  # Auth guard for protected routes
│       │   └── ThemeProvider.jsx # Dark/light theme wrapper
│       ├── pages/
│       │   ├── Home.jsx          # Landing page with hero, feature cards, FAQs
│       │   ├── Explore.jsx       # Browse all available tools
│       │   ├── SearchResults.jsx # Live search results
│       │   ├── Tool.jsx          # Individual tool detail + rent action
│       │   ├── AddTool.jsx       # List a new tool (protected)
│       │   ├── BorrowedTools.jsx # Tools you've borrowed (protected)
│       │   ├── RegisteredTools.jsx # Tools you've listed (protected)
│       │   ├── ReviewedTools.jsx # Your saved/watchlist (protected)
│       │   ├── Manageprofile.jsx # Edit profile + Firebase image upload (protected)
│       │   ├── Login.jsx         # Login page
│       │   ├── Register.jsx      # Registration page
│       │   └── AboutUs.jsx       # Team page with video background
│       └── redux/
│           ├── store.js          # Redux store with persistence
│           ├── userSlice.js      # User auth state slice
│           └── themeSlice.js     # Dark/light mode state slice
│
└── uploads/                      # Local disk upload storage (served as static)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- [npm](https://npmjs.com) v9 or later
- A [MongoDB Atlas](https://mongodb.com/atlas) cluster (or local MongoDB instance)
- A [Firebase](https://firebase.google.com) project with **Authentication** (Google provider) and **Storage** enabled

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/ToolShare.git
cd ToolShare
```

**2. Install backend dependencies**

```bash
npm install
```

**3. Install frontend dependencies**

```bash
cd frontend
npm install
cd ..
```

---

### Environment Variables

#### Backend — `backend/.env`

Create a file at `backend/.env` with the following keys:

```env
MONGO=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

| Variable | Description |
|---|---|
| `MONGO` | MongoDB connection URI (e.g. from MongoDB Atlas) |
| `JWT_SECRET` | Secret string used to sign JWT tokens — use something long and random |
| `NODE_ENV` | Set to `production` to enable secure cookies over HTTPS |

#### Frontend — `frontend/.env`

Create a file at `frontend/.env`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Your Firebase project's web API key |

> The remaining Firebase config values (auth domain, project ID, etc.) are already hardcoded in `frontend/src/firebase.js` and can be updated there directly.

---

### Running the App

**Development — run both servers concurrently:**

Open two terminals:

```bash
# Terminal 1 — Backend (runs on http://localhost:3000)
npm run dev
```

```bash
# Terminal 2 — Frontend (runs on http://localhost:5173)
cd frontend
npm run dev
```

**Production build:**

```bash
cd frontend
npm run build
```

The Vite proxy in `vite.config.js` forwards all `/api/*` requests from the frontend dev server to `http://localhost:3000`, so no CORS issues in development.

---

## 📡 API Reference

All endpoints are prefixed with `/api`.

### Users — `/api/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | Public | Register a new user with name, email, and password |
| `POST` | `/login` | Public | Login with email and password |
| `POST` | `/google` | Public | Register or login via Google OAuth |
| `POST` | `/logout` | Public | Clear auth cookies and end session |
| `GET` | `/` | Public | Get all users |
| `GET` | `/:email` | Public | Get a user by email (includes populated tool lists) |
| `PUT` | `/:userId` | 🔒 Protected | Update user profile (name, email, phone, flat, photo) |
| `DELETE` | `/:userId` | 🔒 Protected | Delete a user account |

### Tools — `/api/tools`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | Optional | Get all tools (excludes own tools when logged in) |
| `GET` | `/search?q=` | Optional | Search tools by name or description |
| `GET` | `/borrowed/:userId` | 🔒 Protected | Get tools currently borrowed by a user (with due dates) |
| `GET` | `/owned/:userId` | 🔒 Protected | Get tools registered/owned by a user |
| `GET` | `/:toolId` | Public | Get a single tool's full details |
| `POST` | `/add` | 🔒 Protected | Register a new tool for lending |
| `POST` | `/rent/:toolId` | 🔒 Protected | Borrow a tool (sets 7-day due date) |
| `POST` | `/return/:toolId` | 🔒 Protected | Return a borrowed tool |
| `POST` | `/renew/:toolId` | 🔒 Protected | Extend current borrow period |
| `POST` | `/save/:toolId` | 🔒 Protected | Save a tool to your watchlist |
| `DELETE` | `/save/:toolId` | 🔒 Protected | Remove a tool from your watchlist |
| `PUT` | `/:toolId` | 🔒 Protected | Update a tool listing (owner only) |
| `DELETE` | `/:toolId` | 🔒 Protected | Delete a tool listing (owner only) |

---

## 🗺️ Pages & Navigation

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/` | Home | Public | Hero section, feature highlights, FAQ accordion |
| `/explore` | Explore | Public | Browse all available community tools |
| `/search?q=` | Search Results | Public | Filtered tool results by keyword |
| `/tool/:toolId` | Tool Detail | Public | Full info, rent, and save-for-later actions |
| `/login` | Login | Public | Email/password or Google sign-in |
| `/register` | Register | Public | Create a new account |
| `/about` | About Us | Public | Team page with video background |
| `/addtool` | Add Tool | 🔒 Auth | Form to register a new tool for lending |
| `/borrowed` | Borrowed Tools | 🔒 Auth | View your active borrows, due dates, renew/return |
| `/registered` | Registered Tools | 🔒 Auth | Tools you've listed — edit or delete in-place |
| `/reviewed` | Saved Tools | 🔒 Auth | Your personal tool watchlist |
| `/manage-profile` | Manage Profile | 🔒 Auth | Edit personal info and upload profile picture |

---

## 🏛️ Architecture Overview

```
Browser
  │
  ├── React SPA (Vite · port 5173)
  │     ├── Redux store (auth state + theme, persisted via redux-persist)
  │     ├── React Router DOM — client-side routing
  │     ├── Firebase SDK — Google Auth + Storage (profile pictures)
  │     └── fetch() API calls → proxy → /api/*
  │
  └── Express REST API (Node.js · port 3000)
        ├── Helmet — security headers
        ├── express-rate-limit — 100 req / 15 min / IP
        ├── cookie-parser — reads httpOnly JWT cookie
        ├── auth middleware — verifyToken / optionalAuth
        ├── Tool routes → ToolController → ToolModel
        ├── User routes → UserController → UserModel
        └── MongoDB Atlas (Mongoose ODM)
```

### Data Models

**User**

| Field | Type | Notes |
|---|---|---|
| `name` | String | Display name |
| `email` | String | Unique identifier |
| `password` | String | bcrypt hash; absent for Google users |
| `phone` | String | Contact number |
| `flatNumber` | String | Shown to borrowers for physical pickup |
| `profilePicture` | String | URL (Firebase Storage or default avatar) |
| `toolsBorrowed` | ObjectId[] | Ref → Tool |
| `toolsOwned` | ObjectId[] | Ref → Tool |
| `toolsReviewed` | ObjectId[] | Ref → Tool (saved/watchlist) |

**Tool**

| Field | Type | Notes |
|---|---|---|
| `name` | String | Tool name |
| `description` | String | Details and usage instructions |
| `owner` | ObjectId | Ref → User |
| `availability` | Boolean | `true` = available to borrow |
| `max` | Number | Max simultaneous borrows allowed |
| `rentedCount` | Number | How many are currently out |
| `rentedBy` | ObjectId[] | Currently active borrowers |
| `borrows` | Array | Per-borrower records: userId, borrowedAt, dueDate |
| `price` | Number | Daily rental price (₹) |
| `image` | String | Base64 data URI or URL |

---

## 🔒 Security

| Measure | Detail |
|---|---|
| **httpOnly cookies** | The JWT auth token is stored in an httpOnly cookie — inaccessible to JavaScript, preventing XSS token theft |
| **Helmet.js** | Sets a comprehensive set of HTTP security headers on every response |
| **Rate limiting** | Each IP is limited to 100 requests per 15-minute window |
| **bcrypt hashing** | Passwords are hashed with a cost factor of 10 before storage |
| **JWT expiry** | Tokens expire after 7 days |
| **Owner authorisation** | Tool update and delete endpoints verify that the requesting user is the tool owner |
| **Secure cookie flag** | Auth cookies set `secure: true` automatically when `NODE_ENV=production` |
| **5 MB upload limit** | Both the Express server and Multer enforce a 5 MB file size cap |

---

## 👩‍💻 The Team

Built with ❤️ by three developers from the ground up:

| | Name |
|---|---|
| **M** | Mishka |
| **K** | Khushi |
| **M** | Mayeraa |

---

<div align="center">

*ToolShare — share what you have with those who need it.*

</div>
