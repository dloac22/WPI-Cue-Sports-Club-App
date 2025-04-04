import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the user data
interface User {
  name: string;
  email: string;
  profilePicture?: string;
}

// Define the context value type
interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
