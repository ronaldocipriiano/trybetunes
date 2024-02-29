import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../images/logo.png';

function Header() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUser()
      .then((user) => {
        setUserName(user.name);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p data-testid="header-loading">Carregando...</p>;
  }

  return (
    <header data-testid="header-component">
      <img src={ logo } alt="Logo da empresa" />
      <nav>
        <NavLink to="search" data-testid="link-to-search">
          Search
        </NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">
          Favorites
        </NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">
          Profile
        </NavLink>
      </nav>
      <p data-testid="header-user-name">{ userName }</p>
    </header>
  );
}

export default Header;
