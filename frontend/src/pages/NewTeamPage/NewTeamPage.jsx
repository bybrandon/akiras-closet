import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as heroService from '../../services/heroService';

export default function NewTeamPage() {
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // sendRequest is expecting an object as the payload
      await heroService.create({ content });
      navigate('/heroes');
    } catch (err) {
      setErrorMsg('Assembling Team Failed');
    }
  }

  return (
    <>
      <h2>Assemble Team</h2>
      <form onSubmit={handleSubmit}>
        <label>Post Content</label>
        <input
          type="text"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          required
        />
        <button type="submit">ASSEMBLE TEAM</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}