import React , {useEffect , useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { LogBox } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/Localization/i18n';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LanguageContextProvider } from './src/Context/context';
import { ProfileDataContextProvider } from './src/Context/ProfileContext';
import { LanguageContext ,LanguageContextProvider } from './src/Context/context';
LogBox.ignoreAllLogs();
import RNRestart from 'react-native-restart';
// I18nManager.forceRTL(true);
const App = () => {
    useEffect(() => {
    async function getLanguageFromStorage() {
      try {
        const language = await AsyncStorage.getItem('lang');

        if (language !== null) {
          if (language === 'ar') {
            I18nManager.forceRTL(true);
    !I18nManager.isRTL && RNRestart.Restart()
          } else {
            I18nManager.forceRTL(false);
  I18nManager.isRTL && RNRestart.Restart()
          }
        }
      } catch (error) {
        // Handle any errors that might occur during AsyncStorage retrieval
        console.error('Error setting language from AsyncStorage:', error);
      }
    }
        getLanguageFromStorage(); // Call the function when the component mounts
  }, []);
  // useEffect(() => {
  //   I18nManager.forceRTL(true);
  //   !I18nManager.isRTL && RNRestart.Restart()
  // }, []);
  // const { language } = useContext(LanguageContext); // Make sure to import useContext

  // useEffect(() => {
  //   if (language !== null) {
  //     i18n.changeLanguage(language);
  //     console.log('languageeew', language);

  //     if (language === 'ar') {
  //       I18nManager.forceRTL(true);
  //     } else {
  //       I18nManager.forceRTL(false);
  //     }
  //   }
  // }, [language]);
  // useEffect(() => {
  //   async function getLanguageFromStorage() {
  //     try {
  //       const language = await AsyncStorage.getItem('lang');

  //       if (language !== null) {
  //         if (language === 'ar') {
  //           I18nManager.forceRTL(true);
  //         } else {
  //           I18nManager.forceRTL(false);
  //         }
  //       }
  //     } catch (error) {
  //       // Handle any errors that might occur during AsyncStorage retrieval
  //       console.error('Error setting language from AsyncStorage:', error);
  //     }
  //   }

  //   setLanguageFromStorage(); // Call the function when the component mounts
  // }, []);
  return (
    <LanguageContextProvider >
      {/* <ProfileDataContextProvider> */}
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </I18nextProvider>
      {/* </ProfileDataContextProvider> */}
    </LanguageContextProvider>
  );
};

export default App;
