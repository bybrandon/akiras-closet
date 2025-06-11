import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as heroService from '../../services/heroService';

export default function NewTeamPage() {
 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ability: '',
    cost: '',
    heroes: []
  });
  
  const [heroes, setHeroes] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const heroList = await heroService.getAll(); // adjust to your API method
        setHeroes(heroList);
      } catch (err) {
        console.error('Failed to load heroes', err);
      }
    }
    fetchHeroes();
  }, []);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'cost' ? Number(value) : value
    }));
  }

  function handleHeroSelect(evt) {
    const selectedOptions = Array.from(evt.target.selectedOptions);
    const selectedHeroIds = selectedOptions.map(option => option.value);
    setFormData(prevData => ({
      ...prevData,
      heroes: selectedHeroIds
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await heroService.create(formData);
      navigate('/heroes'); // Redirect after success
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
        <select id="heroes" name="heroes" multiple>
          {heroes.map(hero => (
            <option key={hero._id} value={hero._id}>
              {hero.description}
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


//   async function handleSubmit(evt) {
//     evt.preventDefault();
//     try {
//       // sendRequest is expecting an object as the payload
//       await heroService.create({ content });
//       navigate('/heroes');
//     } catch (err) {
//       setErrorMsg('Assembling Team Failed');
//     }
//   }

//   return (
//     <>
//       <h2>Assemble Team</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Post Content</label>
//         <input
//           type="text"
//           value={content}
//           onChange={(evt) => setContent(evt.target.value)}
//           required
//         />
//         <button type="submit">ASSEMBLE TEAM</button>
//       </form>
//       <p className="error-message">&nbsp;{errorMsg}</p>
//     </>
//   );
// }