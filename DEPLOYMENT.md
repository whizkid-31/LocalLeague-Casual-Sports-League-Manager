# Deployment Guide

## 🚀 Quick Start - Local Development

Both servers are now running:

- **Backend API**: http://localhost:4000
- **Frontend**: http://localhost:5173 (or check terminal output)

## 📦 Deploy to Production

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: LocalLeague app with auth"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/local-league.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `localleague-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run prisma:generate`
   - **Start Command**: `npm run start`
5. Add Environment Variables:
   - `DATABASE_URL`: Your PlanetScale connection string
   - `JWT_SECRET`: A strong random secret (generate with `openssl rand -base64 32`)
   - `JWT_TTL`: `1h` (optional)
   - `PORT`: `10000` (Render default)
6. Click "Create Web Service"
7. Wait for deployment and copy your backend URL (e.g., `https://localleague-backend.onrender.com`)

### Step 3: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://localleague-backend.onrender.com`)
6. Click "Deploy"
7. Your frontend will be live at `https://your-project.vercel.app`

### Step 4: Update Frontend API URL

After backend is deployed, update the frontend environment variable in Vercel:
1. Go to your Vercel project → Settings → Environment Variables
2. Update `VITE_API_URL` to your Render backend URL
3. Redeploy the frontend

## 🗄️ PlanetScale Database Setup

1. Go to [planetscale.com](https://planetscale.com) and sign up
2. Create a new database: `localleague-db`
3. Go to "Connect" → Copy the connection string
4. Use this as your `DATABASE_URL` in Render
5. Run migrations:
   ```bash
   cd backend
   npx prisma db push
   ```

## ✅ Testing

### Local Testing
- Backend: http://localhost:4000/health
- Frontend: http://localhost:5173

### Production Testing
1. Visit your Vercel frontend URL
2. Test signup/login flows
3. Check browser console for any errors
4. Verify API calls are going to your Render backend

## 🔧 Troubleshooting

- **Backend won't start**: Check `.env` file has `DATABASE_URL` and `JWT_SECRET`
- **Frontend can't connect**: Verify `VITE_API_URL` matches your backend URL
- **Database errors**: Ensure PlanetScale connection string is correct and database is created
- **CORS errors**: Backend already has CORS enabled, but verify frontend URL is allowed

