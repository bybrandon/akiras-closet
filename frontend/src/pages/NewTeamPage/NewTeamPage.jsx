import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as teamService from '../../services/teamService';

export default function NewTeamPage({ heroes }) {

  const [formData, setFormData] = useState({
    name: '',
    heroes: []
  });

  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'heroes' ? 
          Array.from(evt.target.selectedOptions).map(option => option.value)
          :
          value
    }));
  }


  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await teamService.create(formData);
      navigate('/teams');
    } catch (err) {
      console.error(err);
      setErrorMsg('Assembling Team Failed');
    }
  }

  return (
    <div className="isaac">
      <h2 className="header-1">Assemble Your Squad</h2>
      <form onSubmit={handleSubmit} className="submit-1">
        <div>
          <label className="title">Squad Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="required"
          />
        </div>
        <label htmlFor="heroes">Add Your Heroes:</label>
        <select id="heroes" name="heroes" multiple
          onChange={handleChange}
        >
          {heroes.map(hero => (
            <option key={hero._id} value={hero._id}>
              {hero.name},{hero.description} {hero.cost}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="assemble-button"
        >
          ASSEMBLE TEAM
        </button>
      </form>
      {errorMsg && (
        <p className="err-message">{errorMsg}</p>
      )}
    </div>
  );
}
