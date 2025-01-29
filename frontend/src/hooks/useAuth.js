import { useState, useEffect } from 'react';
import AuthService from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      // console.error('Error parsing stored user data:', error);
      return null;
    }
  });

  const signIn = async (email, password) => {
    try {
      const userData = await AuthService.signIn(email, password);

      // Assuming userData contains a 'userId' field.
    const userId = userData.userId;
    if (userId) {
      localStorage.setItem('userId', userId);  // Set the userId in localStorage
    }
      console.log('User data after signIn:', userData);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
     
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        console.log('Stored user data on load:', storedUser);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error parsing stored user data on load:', error);
    }
  }, []);

  return { user, signIn, signOut };
};
