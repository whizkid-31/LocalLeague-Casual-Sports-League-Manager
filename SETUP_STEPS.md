# Quick Setup Steps

## Step 1: Create Database in MySQL Workbench

1. Open **MySQL Workbench**
2. Connect to your local MySQL server (usually `localhost:3306` with username `root`)
3. Run this SQL command:
   ```sql
   CREATE DATABASE localleague;
   ```

## Step 2: Get Your Connection String

Your connection string format is:
```
mysql://root:YOUR_PASSWORD@localhost:3306/localleague
```

**To find your MySQL root password:**
- Check MySQL Workbench's stored connections
- Or if you don't have a password, use: `mysql://root@localhost:3306/localleague`

## Step 3: Update .env File

Edit `backend/.env` and update the `DATABASE_URL` line:
```
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/localleague"
```

**Important:** If your password has special characters, URL encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `&` → `%26`

## Step 4: Push Schema

Run this command:
```bash
cd backend
npx prisma db push
```

## Step 5: Restart Backend

In your backend terminal where nodemon is running, type:
```
rs
```

That's it! Your app should now work.

