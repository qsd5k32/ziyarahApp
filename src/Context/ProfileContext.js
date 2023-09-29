import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the ProfileDataContext
export const ProfileDataContext = createContext();

// Create a ProfileDataContextProvider component
export const ProfileDataContextProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({});
  const [Loading, setLoading] = useState(true);

  // Load profile data from API or local storage
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token !== null) {
          // Fetch profile data from the API using the token
          const response = await fetch('https://ziyarh.com/api/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const responseData = await response.json();
            setProfileData(responseData);
            setLoading(false);
          } else {
            // Handle API error here
          }
        }
      } catch (error) {
        // Handle error here
      }
    };

    loadProfileData();
  }, []);

  // Function to update profile data and send it to the API
  const updateProfileData = async (updatedData) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token !== null) {
        // Send a request to update the profile data
        const response = await fetch('https://ziyarh.com/api/profile/edit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          // Successfully updated profile data
          const responseData = await response.json();
          setProfileData(responseData);
        } else {
          // Handle update error here
        }
      }
    } catch (error) {
      // Handle error here
    }
  };

  return (
    <ProfileDataContext.Provider value={{ profileData, updateProfileData, Loading }}>
      {children}
    </ProfileDataContext.Provider>
  );
};
