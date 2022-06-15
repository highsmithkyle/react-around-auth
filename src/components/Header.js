import React from 'react';
import logo from '../images/newlogo.png';
import { useLocation, Link } from 'react-router-dom';

function Header({ onSignOut, email }) {
  function handleSignOut() {
    onSignOut();
  }

  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Around The World" className="header__logo" />
      {location.pathname === '/signup' ? (
        <Link className="header__auth-link" to="/signin">
          Login
        </Link>
      ) : location.pathname === '/signin' ? (
        <Link className="header__auth-link" to="/signup">
          Sign up
        </Link>
      ) : (
        <div className="header__auth-wrapper">
          <p className="header__user">{email}</p>
          <button className="header__logout" onClick={handleSignOut}>
            Log out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
