# LocalLeague - Casual Sports League Manager

Monorepo with Node.js/Express/Prisma backend and React frontend.

## Setup

### Prerequisites
- Node.js 18+
- MySQL running locally

### Backend Setup

1. Navigate to backend:
```bash
cd backend
npm install
```

2. Configure `.env`:
```
DATABASE_URL="mysql://root:password@localhost:3306/localleague"
JWT_SECRET="your-secret-key-change-in-production"
PORT=4000
```

3. Setup database:
```bash
npx prisma migrate dev --name init
npm run seed
```

4. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend:
```bash
cd frontend
npm install
```

2. Configure `.env`:
```
VITE_API_BASE_URL=http://localhost:4000
```

3. Start dev server:
```bash
npm run dev
```

## Default Admin Credentials
- Email: admin@localleague.com
- Password: admin123

## API Endpoints

### Auth
- POST /api/signup - Register user
- POST /api/login - Login

### Leagues
- GET /api/leagues - List leagues (paginated)
- POST /api/leagues - Create league (admin)
- GET /api/leagues/:id/standings - Get standings

### Teams
- GET /api/teams?search=query - Search teams
- GET /api/teams/:id - Get team details
- POST /api/teams - Create team (admin)

### Players
- GET /api/players - List players
- POST /api/players - Create player (admin)

### Games
- GET /api/games?teamId=&status=&page=&limit= - List games (filtered)
- POST /api/games - Schedule game (admin)
- PUT /api/games/:id/score - Update score

## Frontend Routes
- /login - Login page
- /leagues - Leagues list
- /leagues/:id/schedule - League schedule
- /leagues/:id/standings - League standings
- /teams/:id - Team details
- /admin/create-league - Create league (admin)
- /admin/schedule-game - Schedule game (admin)
