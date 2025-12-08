import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export const CreateLeague = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post('/api/leagues', { name, description });
      if (result.error) {
        setError(result.error);
      } else {
        navigate('/leagues');
      }
    } catch (err) {
      setError('Failed to create league: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <div className="form-container">
      <h2>Create League</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="League Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
