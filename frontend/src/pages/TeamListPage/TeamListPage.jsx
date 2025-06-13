import { useState, useEffect } from 'react';
import * as heroService from '../../services/heroService';
import * as teamService from '../../services/teamService';

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
      <h1>Squad List</h1>
      {teams.length ? 
        <ul>
          {teams.map((team) => <li key={team._id}>{team.name}</li>)}
        </ul>
        :
        <p>No Squads Yet!</p>
      }
    </>
  );
}
