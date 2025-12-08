import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';

export const TeamDetail = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    api.get(`/api/teams/${id}`).then(setTeam);
  }, [id]);

  if (!team) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>{team.name}</h2>
      <p>League: {team.league.name}</p>
      
      <h3>Players</h3>
      <ul>
        {team.players.map(p => (
          <li key={p.id}>{p.name} {p.position && `(${p.position})`}</li>
        ))}
      </ul>

      <h3>Recent Games</h3>
      <ul>
        {[...team.homeGames, ...team.awayGames].slice(0, 5).map(g => (
          <li key={g.id}>
            {g.homeTeam?.name || team.name} vs {g.awayTeam?.name || team.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
