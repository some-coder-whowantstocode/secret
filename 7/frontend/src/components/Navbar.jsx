import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const pagesBeforeLogin = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Signup', path: '/signup' },
  ];

  const pagesForUser = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'My Bookings', path: '/user-bookings' },
  ];

  const pagesForAdmin = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/hotels' },
  ];

  const renderPages = (pages) => {
    return pages.map(page => (
      <Link key={page.path} to={page.path}>
        {page.name}
      </Link>
    ));
  };

  return (
    <nav>
      {user ? (
        <>
          {user.role === 'admin' ? renderPages(pagesForAdmin) : renderPages(pagesForUser)}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        renderPages(pagesBeforeLogin)
      )}
    </nav>
  );
};

export default Navbar;
