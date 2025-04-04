import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './components/context/authContext';
import Header from './components/common/header';
import Sidebar from './components/common/sidebar';

const App: React.FC = () => {
  const { setUser } = useAuth();

  useEffect(() => {
    // test case
    const fetchedUser = {
      name: "John fucking Doe",
      email: "johnfuckingdoe@example.com",
      profilePicture: "https://via.placeholder.com/80", 
    };
    setUser(fetchedUser);
  }, [setUser]);

  return (
    <AuthProvider>
      <Header />
      <Sidebar />
    </AuthProvider>
  );
};

export default App;
