import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as teamService from '../../services/teamService';

export default function TeamDetailPage({ user }) {
    const [team, setTeam] = useState(null);
    const { teamId } = useParams();

    useEffect(() => {
        async function fetchTeam() {
            const team = await teamService.show(teamId);
            setTeam(team);
        }
        fetchTeam();
    }, []);

    if (!team) return null;

    function handleRemoveHero(heroId) {

    }

    return (
        <>
            <h1>{team.name}</h1>
            <section className="team-hereos">
                {team.heroes.length ?
                    <ul>
                        {team.heroes.map((hero) => (
                            <li key={hero}>
                                {hero.name}
                                { user._id === team.author && <button onClick={() => handleRemoveHero(hero._id)}>🗑️</button>}
                            </li>
                        ))}
                    </ul>
                    :
                    <p>No Heroes Assigned</p>
                }
            </section>
        </>
    );
}

