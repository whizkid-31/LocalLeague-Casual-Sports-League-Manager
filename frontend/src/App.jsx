import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Leagues } from './pages/Leagues';
import { Standings } from './pages/Standings';
import { Schedule } from './pages/Schedule';
import { TeamDetail } from './pages/TeamDetail';
import { CreateLeague } from './pages/CreateLeague';
import { ScheduleGame } from './pages/ScheduleGame';
import './App.css';
import './index.css';

const Nav = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="nav">
      <div>
        <Link to="/leagues">Leagues</Link>
        {isAuthenticated && isAdmin() && (
          <>
            <Link to="/admin/create-league">Create League</Link>
            <Link to="/admin/schedule-game">Schedule Game</Link>
          </>
        )}
      </div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/leagues/:id/standings" element={<Standings />} />
          <Route path="/leagues/:id/schedule" element={<Schedule />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/admin/create-league" element={<ProtectedRoute adminOnly><CreateLeague /></ProtectedRoute>} />
          <Route path="/admin/schedule-game" element={<ProtectedRoute adminOnly><ScheduleGame /></ProtectedRoute>} />
          <Route path="/" element={<Leagues />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
