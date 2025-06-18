import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as teamService from '../../services/teamService';
import * as heroService from '../../services/heroService';
import './TeamDetailPage.css'

export default function TeamDetailPage({ user }) {
    const [team, setTeam] = useState(null);
    const [formData, setFormData] = useState({ author: user._id, comment: '' });
    const [availableHeroes, setAvailableHeroes] = useState([]);
    const { teamId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTeams() {
            const team = await teamService.show(teamId);
            setTeam(team);
        }
        fetchTeams();
    }, []);

    useEffect(() => {
        async function fetchHeroes() {
            const heroes = await heroService.getAvailableForTeam(teamId);
            setAvailableHeroes(heroes);
        }
        fetchHeroes();
    }, [team]);

    if (!team) return null;

    const totalHeroCost = team.heroes.reduce((total, hero) => total + hero.cost, 0);
    const costAvailable = 1000 - totalHeroCost;



    async function handleDeleteTeam() {
        await teamService.deleteTeam(team._id);
        navigate('/teams');
    }
    async function handleRemoveHero(heroId) {
        const updatedTeam = await teamService.removeHero(team._id, heroId);
        setTeam(updatedTeam);
    }
    async function handleAddHero(heroId) {
        const updatedTeam = await teamService.addHero(team._id, heroId);
        setTeam(updatedTeam);
    }

    async function handleAddComment() {
        const comment = await teamService.addComment(team._id, formData)
    }

    return (
        <div className="team-heroes-container">
            <section className="team-heroes">
                <h1>{team.name}</h1>
                {user._id === team.author && <button onClick={handleDeleteTeam}>Disassemble</button>}
                {team.heroes.length ?
                    <ul>
                        {team.heroes.map((hero) => (
                            <li key={hero._id}>
                                {hero.name}
                                {user._id === team.author && <button onClick={() => handleRemoveHero(hero._id)}>release</button>}
                            </li>
                        ))}
                    </ul>
                    :
                    <p>No Heroes Assigned</p>
                }
            </section>
            <section className="recruitment">
                <h2> Recruit Hero</h2>
                {availableHeroes.length ?
                    <ul>
                        {availableHeroes.map((availableHero) => (
                            <li key={availableHero._id}>
                                {availableHero.name},
                                {availableHero.description}
                                {availableHero.ability}
                                {user._id === team.author && costAvailable >= availableHero.cost && <button onClick={() => handleAddHero(availableHero._id)}>recruit</button>}
                                {user._id === team.author && costAvailable < availableHero.cost && <p>Not Enough Points</p>}
                            </li>
                        ))}
                    </ul>

                    :
                    <p>No Heroes Available</p>
                }
            </section>
        </div>
    );
}

