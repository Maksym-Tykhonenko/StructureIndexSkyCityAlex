import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

const SAVED_PLACES_KEY = 'savedPlaces';

export const useSkyCityStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const [createdProfile, setCreatedProfile] = useState(false);
  const [places, setPlaces] = useState([]);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  const checkProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem('userProfile');

      if (profile) {
        setCreatedProfile(true);
      } else {
        setCreatedProfile(false);
      }
    } catch (error) {
      console.error('Error checking:', error);
    }
  };

  const getSavedPlaces = async () => {
    try {
      const savedData = await AsyncStorage.getItem(SAVED_PLACES_KEY);

      const savedPlaces = savedData ? JSON.parse(savedData) : [];

      console.log('loaded');

      setPlaces(savedPlaces);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadSavedProfile = async () => {
    try {
      const data = await AsyncStorage.getItem('userProfile');

      if (data) {
        const profile = JSON.parse(data);
        setName(profile.userName);
        setPhoto(profile.userPhoto);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const contextValues = {
    createdProfile,
    checkProfile,
    places,
    getSavedPlaces,
    name,
    setName,
    photo,
    setPhoto,
    loadSavedProfile,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
