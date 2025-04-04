import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Practice', path: '/practice' },
    { name: 'Drills', path: '/drills' }
  ];

  return (
    <div className="sidebar bg-dark text-white d-flex flex-column" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="text-center">
          <img 
            src={user?.profilePicture} 
            alt="User" 
            className="rounded-circle mb-3" 
            style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
          />
          <h5>{user ? user.name : 'Guest'}</h5>
        </div>
      </div>

      <Nav className="flex-column mt-2">
        {menuItems.map((item, index) => (
          <Link 
            to={item.path} 
            key={index}
            className={`py-3 ${location.pathname === item.path ? 'active bg-secondary' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
