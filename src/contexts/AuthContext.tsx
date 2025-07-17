import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<Array<{name: string, email: string, password: string}>>([]);

  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    
    if (!/\d/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one special character' };
    }
    
    return { isValid: true, message: '' };
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in registered users
    const existingUser = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (existingUser) {
      setUser({
        id: '1',
        email: existingUser.email,
        name: existingUser.name
      });
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setIsLoading(false);
      return { success: false, message: passwordValidation.message };
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = registeredUsers.find(u => u.email === email);
    
    if (!existingUser && name && email && password) {
      // Add new user to registered users
      const newUser = { name, email, password };
      setRegisteredUsers(prev => [...prev, newUser]);
      
      // Log them in immediately after registration
      setUser({
        id: '1',
        email,
        name
      });
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, message: 'Email already exists or invalid data provided' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};