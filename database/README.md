## PlanetScale Database Setup

This guide walks through provisioning a MySQL database on PlanetScale and connecting it to the backend via Prisma.

1. **Install the PlanetScale CLI**
   ```bash
   brew install planetscale/tap/pscale
   ```
2. **Authenticate and create a database**
   ```bash
   pscale auth login
   pscale database create localleague-db --region us-east
   ```
3. **Create a development branch**
   ```bash
   pscale branch create localleague-db dev
   pscale password create localleague-db dev backend-access
   ```
   Copy the generated `mysql://` connection string.
4. **Configure environment variables**
   - In `backend/.env`, set:
     ```bash
     DATABASE_URL="mysql://<user>:<password>@<host>:3306/<database>?sslaccept=strict"
     JWT_SECRET="replace-with-strong-secret"
     JWT_TTL="1h"
     PORT=4000
     ```
5. **Push the Prisma schema**
   ```bash
   cd backend
   npx prisma db push --skip-generate
   npm run prisma:generate
   ```
6. **Deploy schema changes to main**
   ```bash
   pscale deploy-request create localleague-db dev --deploy-to main
   pscale deploy-request deploy localleague-db <deploy-request-number>
   ```
7. **Update production branch password (if needed)** and redeploy your backend using the production connection string.

> PlanetScale uses branch-based schema changes; prefer `prisma db push` instead of Prisma migrations for PlanetScale-managed databases.

