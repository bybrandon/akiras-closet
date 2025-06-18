import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as teamService from '../../services/teamService';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './NewTeamPage.css'

export default function NewTeamPage({ heroes }) {

  const [formData, setFormData] = useState({
    name: '',
    heroes: []
  });


  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const totalHeroCost = formData.heroes.reduce((total, hero) => total + hero.cost, 0);
  const costAvailable = 1000 - totalHeroCost;
  console.log(costAvailable);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
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
        <Select id="heroes" name="heroes" value={formData.heroes} multiple
          onChange={handleChange}
          >
          <p>{costAvailable}</p>
          {heroes.map(hero => (
            <MenuItem
              key={hero._id}
              value={hero}
               disabled={!formData.heroes.some((h) => h._id === hero._id) && hero.cost > costAvailable} 
               
              >
              {hero.name},
              {hero.cost}
            </MenuItem>
          ))}
        </Select>
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
