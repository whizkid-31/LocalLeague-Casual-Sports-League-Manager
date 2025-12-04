#!/bin/bash

# Start both backend and frontend servers simultaneously

echo "🚀 Starting LocalLeague development servers..."
echo ""

# Start backend in background
echo "📦 Starting backend server..."
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend in background
echo "⚛️  Starting frontend server..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servers starting..."
echo ""
echo "📊 Backend PID: $BACKEND_PID"
echo "📊 Frontend PID: $FRONTEND_PID"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:4000"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 To stop: kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Waiting for servers to be ready..."

# Wait and check if servers are up
sleep 3

if curl -s http://localhost:4000/health > /dev/null 2>&1; then
    echo "✅ Backend is ready!"
else
    echo "⚠️  Backend may need configuration (check backend.log)"
fi

if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Frontend is ready!"
else
    echo "⚠️  Frontend may still be starting..."
fi

echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for interrupt
wait

