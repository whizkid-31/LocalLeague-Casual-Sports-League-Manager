# Database Setup Guide

## Quick Setup Options

### Option 1: PlanetScale (MySQL) - Recommended

1. **Sign up at [planetscale.com](https://planetscale.com)** (free tier available)

2. **Create a database:**
   - Click "Create database"
   - Name it: `localleague-db`
   - Choose a region
   - Click "Create database"

3. **Get connection string:**
   - Click on your database
   - Go to "Connect" tab
   - Under "Connect with Prisma", copy the connection string
   - It should look like: `mysql://xxxxx:xxxxx@aws.connect.psdb.cloud/localleague-db?sslaccept=strict`

4. **Update your `.env` file:**
   ```bash
   cd backend
   # Edit .env file and replace DATABASE_URL with your PlanetScale connection string
   DATABASE_URL="mysql://your-planetscale-connection-string"
   ```

5. **Push the schema:**
   ```bash
   npx prisma db push
   ```

6. **Restart your backend** (type `rs` in the nodemon terminal)

---

### Option 2: Neon (PostgreSQL) - Quick Alternative

1. **Sign up at [neon.tech](https://neon.tech)** (free tier)

2. **Create a project:**
   - Click "Create Project"
   - Copy the connection string

3. **Update schema to PostgreSQL:**
   - Change `provider = "mysql"` to `provider = "postgresql"` in `prisma/schema.prisma`
   - Run `npm run prisma:generate`

4. **Update `.env`:**
   ```
   DATABASE_URL="postgresql://your-neon-connection-string"
   ```

5. **Push schema:**
   ```bash
   npx prisma db push
   ```

---

### Option 3: Supabase (PostgreSQL) - Another Alternative

1. **Sign up at [supabase.com](https://supabase.com)** (free tier)

2. **Create a project and get connection string**

3. **Follow same steps as Neon (Option 2)**

---

## After Setup

Once your database is connected:
1. Your backend will automatically connect
2. Try signing up again - it should work!
3. The `User` table will be created automatically when you first sign up

