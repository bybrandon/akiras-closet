import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import HomePage from '../HomePage/HomePage';
import TeamListPage from '../TeamListPage/TeamListPage';
import NewTeamPage from '../NewTeamPage/NewTeamPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import * as heroService from '../../services/heroService';
import * as teamService from '../../services/teamService';
import './App.css';

export default function App() {

  const [user, setUser] = useState(getUser());
  const [heroes, setHeroes] = useState([]);
  useEffect(() => {
      async function fetchHeroes() {
        try {
          const heroList = await heroService.index(); 
          setHeroes(heroList);
        } catch (err) {
          console.error('Failed to load heroes', err);
        }
      }
      fetchHeroes();
    }, []);
  
  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teams" element={<TeamListPage />} />
            <Route path="/teams/new" element={<NewTeamPage heroes = {heroes}/> } />
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
    </main>
  );
}