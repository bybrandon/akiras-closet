import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import * as teamService from '../../services/teamService';
import './TeamListPage.css'

export default function TeamListPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      const teams = await teamService.index();
      setTeams(teams);
    }
    fetchTeams();
  }, []);

  return (
    <>
      <h1><strong>Squad List</strong></h1>
      {teams.length ?
        <div className='squads'>
          <ul>
            {teams.map((team) => 
              <Link to={`/teams/${team._id}`}><li>
                {team.name} ({team.author.name})
                </li></Link>
            )}
          </ul>
        </div>
        :
        <p>No Squads Yet!</p>
      }
    </>
  );
}
