# LocalLeague

A full-stack application with React frontend, Node.js/Express backend, and PlanetScale MySQL database.

## 🚀 Quick Start

### Local Development

**Backend:**
```bash
cd backend
npm install
# Set up .env file with DATABASE_URL and JWT_SECRET
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
# Set up .env file with VITE_API_URL=http://localhost:4000
npm run dev
```

### Access Locally

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

## 📁 Project Structure

```
LocalLeague/
├── frontend/          # React + Vite application
├── backend/           # Node.js + Express API
└── database/          # Database setup and migrations
```

## 🔐 Features

- User authentication (Login/Signup)
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control (USER/ADMIN)
- Protected routes

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Vercel (frontend) and Render (backend).

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Vite
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: MySQL (PlanetScale)
- **Authentication**: JWT, bcrypt

