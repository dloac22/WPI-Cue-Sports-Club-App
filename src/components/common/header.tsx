import React from 'react';
import { useAuth } from '../context/authContext';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container fluid className="py-3 bg-light">
      <h1 className="ps-3">HELLO, {user ? user.name : 'Guest'}</h1>
    </Container>
  );
};

export default Header;
