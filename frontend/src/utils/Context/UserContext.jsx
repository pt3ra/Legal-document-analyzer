import React, { createContext, useState, useContext, useEffect } from 'react'
import AuthService from '../Service/AuthService'

export const UserContext = createContext(null);

// Hook for easier access
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle LOGIN after successful signin/singup
  const loginUser = () => {
    fetchUserProfile();
  };

  // Function to fetch USER and PROFILE DATA
  const fetchUserProfile = async () => {
    try {
      const userData = await AuthService.getUser();
      setUser(userData);
      //const profileData = await AuthService.getProfile();
      //setProfile(profileData);
    } catch (error) {
      console.error("Failed to fetch user and profile", error);
      removeData();
    } finally {
      setIsLoading(false);
    }
  };

  // Clearing the storage and logging out
  const logoutUser = () => {
    AuthService.logout();
    removeData();
  }
  const removeData = () => {
    setUser(null);
    setProfile(null);
  }

  /* Initial load: Check for a token and fetch the profile once
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log("Context Mount: Token found?", !!token);
    if (token) {
      console.log("Context: Calling fetchUserProfile()...");
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, []); */

  // Initial load
  useEffect(() => {
    console.log("Context Mount: Attempting auto-login with cookie...");
    fetchUserProfile()
  }, []);

  // Exposing state and updating functions
  const contextValue = {
    user,
    profile,
    isLoading,
    loginUser,
    logoutUser
  };

  if (isLoading) {
      return <div style={{padding: "50px", textAlign: "center"}}>Loading Application...</div>;
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;