import React, { useState } from 'react';
import { Nav, Image, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const [profilePic, setProfilePic] = useState(user?.profilePicture || 'https://via.placeholder.com/80');

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfilePic = reader.result as string;
        setProfilePic(newProfilePic);
        if (user) {
          setUser({ ...user, profilePicture: newProfilePic });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/drills', label: 'Drills' },
    { path: '/practice', label: 'Practice' },
    { path: '/profile', label: 'Profile' },
    { path: '/tournaments', label: 'Tournaments' },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.profileSection}>
        <div className={styles.profilePicContainer}>
          <Image 
            src={profilePic} 
            roundedCircle 
            className={styles.profilePic}
            style={{ width: '80px', height: '80px', cursor: 'pointer' }}
          />
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            style={{ display: 'none' }}
            id="profile-pic-input"
          />
          <label htmlFor="profile-pic-input" className={styles.profilePicLabel}>
            Click to change
          </label>
        </div>
        <h4 className="mt-3">Hello, {user?.name || 'Guest'}</h4>
      </div>
      
      <Nav className="flex-column mt-4">
        {navItems.map((item) => (
          <Nav.Item key={item.path}>
            <Nav.Link 
              as={Link} 
              to={item.path}
              active={location.pathname === item.path}
              className={styles.navLink}
            >
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar; 