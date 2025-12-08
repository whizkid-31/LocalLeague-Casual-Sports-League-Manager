import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isAdmin } = useAuth();

  const fetchLeagues = () => {
    api.get(`/api/leagues?page=${page}&limit=2`).then(data => {
      setLeagues(data.data);
      setTotalPages(data.totalPages);
    });
  };

  useEffect(() => {
    fetchLeagues();
  }, [page]);

  const displayTotalPages = totalPages || 1;

  const handleDelete = async (id) => {
    if (confirm('Delete this league?')) {
      await api.delete(`/api/leagues/${id}`);
      fetchLeagues();
    }
  };

  return (
    <div className="container">
      <h2>Leagues</h2>
      {leagues.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.3rem', color: '#666', marginTop: '3rem' }}>NO ADDED LEAGUES AS OF NOW</p>
      ) : (
        <div className="league-grid">
          {leagues.map(league => (
          <div key={league.id} className="league-card">
            <h3>{league.name}</h3>
            {league.description && <p>{league.description}</p>}
            <div className="league-actions">
              <Link to={`/leagues/${league.id}/schedule`} className="btn-primary">View Schedule</Link>
              <Link to={`/leagues/${league.id}/standings`} className="btn-secondary">Standings</Link>
            </div>
            {isAdmin() && (
              <button onClick={() => handleDelete(league.id)} className="btn-delete">Delete</button>
            )}
          </div>
          ))}
        </div>
      )}
      <div className="pagination">
        {page > 1 && <button onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</button>}
        <span style={{ margin: '0 1.5rem', fontSize: '1.1rem', color: '#222' }}>Page {page} of {displayTotalPages}</span>
        {page < totalPages && <button onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>}
      </div>
    </div>
  );
};
