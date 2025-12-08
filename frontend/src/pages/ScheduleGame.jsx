import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export const ScheduleGame = () => {
  const [leagues, setLeagues] = useState([]);
  const [leagueId, setLeagueId] = useState('');
  const [homeTeamName, setHomeTeamName] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');
  const [venue, setVenue] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/leagues?limit=100').then(data => setLeagues(data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const homeTeam = await api.post('/api/teams', { name: homeTeamName, leagueId: parseInt(leagueId) });
      const awayTeam = await api.post('/api/teams', { name: awayTeamName, leagueId: parseInt(leagueId) });
      await api.post('/api/games', {
        leagueId: parseInt(leagueId),
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        venue,
        scheduledDate
      });
      navigate('/leagues');
    } catch {
      setError('Failed to schedule game');
    }
  };

  return (
    <div className="form-container">
      <h2>Schedule Game</h2>
      <form onSubmit={handleSubmit}>
        <select value={leagueId} onChange={(e) => setLeagueId(e.target.value)}>
          <option value="">Select League</option>
          {leagues.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <input
          type="text"
          placeholder="Home Team Name"
          value={homeTeamName}
          onChange={(e) => setHomeTeamName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Away Team Name"
          value={awayTeamName}
          onChange={(e) => setAwayTeamName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />
        <input
          type="datetime-local"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
};
