import React, { useContext, useEffect } from 'react';
import { LanguageContext } from './context';
import { Text } from 'react-native';
const LanguageListener = () => {
    const { language } = useContext(LanguageContext);
  
    useEffect(() => {
      console.log('Language:', language);
    }, [language]);
  
    return <Text>Current language: {language}</Text>;
  };
  
  export default LanguageListener;