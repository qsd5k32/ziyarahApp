import React, { createContext, useState } from 'react';

// Create the LanguageContext
export const LanguageContext = createContext();

// Create a LanguageContextProvider component
export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};