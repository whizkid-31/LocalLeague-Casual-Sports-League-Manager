# Quick Fix for Database Connection

## The Problem
Your `DATABASE_URL` is pointing to a Postgres database, but your Prisma schema is configured for MySQL.

## Solution Options

### Option 1: Use PlanetScale (Recommended for Production)

1. Go to [planetscale.com](https://planetscale.com) and sign up/login
2. Create a new database
3. Go to "Connect" → Copy the connection string (it should look like: `mysql://...`)
4. Update your `backend/.env` file:
   ```
   DATABASE_URL="mysql://your-planetscale-connection-string"
   ```
5. Push the schema:
   ```bash
   cd backend
   npx prisma db push
   ```

### Option 2: Use Local MySQL (For Testing)

1. Install MySQL locally (if not already installed)
2. Create a database:
   ```bash
   mysql -u root -p
   CREATE DATABASE localleague;
   ```
3. Update your `backend/.env` file:
   ```
   DATABASE_URL="mysql://root:yourpassword@localhost:3306/localleague"
   ```
4. Push the schema:
   ```bash
   cd backend
   npx prisma db push
   ```

### Option 3: Switch to PostgreSQL (Quick Test)

If you want to use your existing Postgres connection:

1. Update `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // Change from "mysql"
     url      = env("DATABASE_URL")
   }
   ```
2. Regenerate Prisma client:
   ```bash
   cd backend
   npm run prisma:generate
   ```
3. Push the schema:
   ```bash
   npx prisma db push
   ```

After fixing the database connection, restart your backend server (type `rs` in the nodemon terminal).

