import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';

export const Schedule = () => {
  const { id } = useParams();
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.get(`/api/games?status=upcoming`).then(data => {
      const filtered = data.data.filter(game => game.leagueId === parseInt(id));
      setGames(filtered);
    });
  }, [id]);

  return (
    <div className="container">
      <h2>Schedule</h2>
      <div className="match-list">
        {games.map((game, index) => (
          <div key={game.id} className="match-card">
            <div className="match-number">Match #{index + 1}</div>
            <div className="match-teams">
              <div className="team">
                <span className="team-name">{game.homeTeam.name}</span>
              </div>
              <div className="vs">VS</div>
              <div className="team">
                <span className="team-name">{game.awayTeam.name}</span>
              </div>
            </div>
            <div className="match-details">
              <div className="detail">
                <span className="label">📅 Date:</span>
                <span>{new Date(game.scheduledDate).toLocaleDateString()}</span>
              </div>
              <div className="detail">
                <span className="label">🕐 Time:</span>
                <span>{new Date(game.scheduledDate).toLocaleTimeString()}</span>
              </div>
              {game.venue && (
                <div className="detail">
                  <span className="label">📍 Venue:</span>
                  <span>{game.venue}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
