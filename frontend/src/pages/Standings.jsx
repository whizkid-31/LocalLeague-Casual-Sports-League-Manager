import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const Standings = () => {
  const { id } = useParams();
  const [standings, setStandings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { isAdmin } = useAuth();

  const fetchStandings = () => {
    api.get(`/api/leagues/${id}/standings`).then(setStandings);
  };

  useEffect(() => {
    fetchStandings();
  }, [id]);

  const handleChange = (teamId, field, delta) => {
    setEditedData(prev => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        [field]: (prev[teamId]?.[field] || 0) + delta
      }
    }));
  };

  const handleSave = async () => {
    for (const [teamId, data] of Object.entries(editedData)) {
      await api.put(`/api/teams/${teamId}/stats`, data);
    }
    setEditedData({});
    setEditMode(false);
    fetchStandings();
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Standings</h2>
        {isAdmin() && (
          <div>
            {editMode ? (
              <>
                <button onClick={handleSave} style={{ marginRight: '0.5rem', padding: '0.7rem 1.3rem', background: '#4c6ef5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.05rem', fontWeight: '500' }}>Save</button>
                <button onClick={() => { setEditMode(false); setEditedData({}); }} style={{ padding: '0.7rem 1.3rem', background: 'white', color: '#4c6ef5', border: '2px solid #4c6ef5', borderRadius: '6px', cursor: 'pointer', fontSize: '1.05rem', fontWeight: '500' }}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setEditMode(true)} style={{ padding: '0.7rem 1.3rem', background: '#4c6ef5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.05rem', fontWeight: '500' }}>Edit Stats</button>
            )}
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Played</th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Losses</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map(s => {
            const edits = editedData[s.teamId] || {};
            return (
              <tr key={s.teamId}>
                <td>{s.teamName}</td>
                <td>
                  {editMode ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <button onClick={() => handleChange(s.teamId, 'played', -1)} className="btn-adjust">-</button>
                      <span>{s.played + (edits.played || 0)}</span>
                      <button onClick={() => handleChange(s.teamId, 'played', 1)} className="btn-adjust">+</button>
                    </div>
                  ) : s.played}
                </td>
                <td>
                  {editMode ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <button onClick={() => handleChange(s.teamId, 'wins', -1)} className="btn-adjust">-</button>
                      <span>{s.wins + (edits.wins || 0)}</span>
                      <button onClick={() => handleChange(s.teamId, 'wins', 1)} className="btn-adjust">+</button>
                    </div>
                  ) : s.wins}
                </td>
                <td>
                  {editMode ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <button onClick={() => handleChange(s.teamId, 'draws', -1)} className="btn-adjust">-</button>
                      <span>{s.draws + (edits.draws || 0)}</span>
                      <button onClick={() => handleChange(s.teamId, 'draws', 1)} className="btn-adjust">+</button>
                    </div>
                  ) : s.draws}
                </td>
                <td>
                  {editMode ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <button onClick={() => handleChange(s.teamId, 'losses', -1)} className="btn-adjust">-</button>
                      <span>{s.losses + (edits.losses || 0)}</span>
                      <button onClick={() => handleChange(s.teamId, 'losses', 1)} className="btn-adjust">+</button>
                    </div>
                  ) : s.losses}
                </td>
                <td>
                  {editMode ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <button onClick={() => handleChange(s.teamId, 'points', -1)} className="btn-adjust">-</button>
                      <span>{s.points + (edits.points || 0)}</span>
                      <button onClick={() => handleChange(s.teamId, 'points', 1)} className="btn-adjust">+</button>
                    </div>
                  ) : s.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
