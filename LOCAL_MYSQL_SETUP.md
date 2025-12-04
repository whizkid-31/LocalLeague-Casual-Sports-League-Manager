# Local MySQL Setup with MySQL Workbench

## Step 1: Install MySQL (if not already installed)

### Option A: Using Homebrew (macOS)
```bash
brew install mysql
brew services start mysql
```

### Option B: Download MySQL
- Go to [mysql.com/downloads](https://dev.mysql.com/downloads/mysql/)
- Download MySQL Community Server for macOS
- Install and start MySQL

## Step 2: Create Database in MySQL Workbench

1. **Open MySQL Workbench**
2. **Connect to your local MySQL server:**
   - Default connection: `localhost:3306`
   - Username: `root`
   - Password: (your MySQL root password)

3. **Create a new database:**
   ```sql
   CREATE DATABASE localleague;
   ```

4. **Verify it was created:**
   ```sql
   SHOW DATABASES;
   ```

## Step 3: Get Connection String

Your connection string format will be:
```
mysql://root:YOUR_PASSWORD@localhost:3306/localleague
```

**To find your MySQL root password:**
- If you just installed MySQL, it might be empty or you set it during installation
- If you forgot it, you can reset it or check MySQL Workbench's stored connections

## Step 4: Update Your .env File

Edit `backend/.env`:
```bash
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/localleague"
JWT_SECRET="lwFho7SLFg7qgDGcLHpHe/aFYUPLL5cfQ64rqwEPEmI="
```

**If your password has special characters**, URL encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- etc.

## Step 5: Push Schema to Database

```bash
cd backend
npx prisma db push
```

## Step 6: Restart Backend

In your backend terminal, type `rs` to restart nodemon.

## Troubleshooting

### Can't connect to MySQL?
- Make sure MySQL is running: `brew services list` (should show `started`)
- Check if MySQL is listening: `lsof -i :3306`

### Forgot root password?
```bash
# Stop MySQL
brew services stop mysql

# Start MySQL in safe mode (skip password)
mysqld_safe --skip-grant-tables &

# Connect and reset password
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
FLUSH PRIVILEGES;
```

### Connection refused?
- Make sure MySQL server is running
- Check the port (default is 3306)
- Verify username and password are correct

