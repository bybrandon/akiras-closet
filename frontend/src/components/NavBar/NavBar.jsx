import { NavLink, Link } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {

  function handleLogOut() {
    logOut();
    setUser(null);
    // The <Link> that was clicked will navigate to "/"
  }

  return (
    <nav className="NavBar">
      <NavLink to="/"><strong>HQ</strong></NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/teams" end>
           <strong>Teams</strong> 
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/teams/new"><strong>New Team</strong></NavLink>
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>Log Out</Link>
          <span><strong>Welcome, {user.name}</strong></span>
        </>
      ) : (
        <>
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}