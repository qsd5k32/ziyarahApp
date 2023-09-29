import React, { useState , useContext , useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity , Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import sizes from '../assets/Sizes';
import colors from '../assets/Colors';
import { useFonts } from 'expo-font';
import { LanguageContext } from '../Context/context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeText = (props) => {
const [Data, setData] = useState({});
const [accessToken, setAccessToken] = useState('');

  let [fontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
    ElMessiri: require('../assets/fonts/ElMessiri.ttf'),
    Cairo: require('../assets/fonts/Cairo.ttf'),
    Tajawal: require('../assets/fonts/Tajawal.ttf'),
  });

  useEffect(() => {
    // Your font loading code here
    if (!fontsLoaded) {
      // Handle font loading error here
    }
  }, [fontsLoaded]);
  const { language } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  useEffect(()=>{
    if (language !== null) {
      i18n.changeLanguage(language); // Change language here
      console.log('languageeeeenew', language);
    }
  }, [language]);
  useEffect(() => {
    async function userProfileInformation() {
      try {
        const token = await AsyncStorage.getItem('accessToken');
      if (token !== null) {
        setAccessToken(token);
        console.log(token);
  
        const response = await fetch('https://ziyarh.com/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'lang' : language
          },
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          setData(responseData);
            setIsLoading(false);
          console.log('Profile Userreeeerr Response:', Data.user);
          // console.log('Profile Userrrrrr Response:', Data.information.country);
  
        } else {
          console.error('Profile User Error:', response.status, responseData);
  
          // Handle specific error cases
          if (response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
          } else {
            // Handle other error cases
            // setError('Error fetching user profile. Please try again later.');
          }
        }
      }
    } catch (error) {
      console.error('Profile User Error:', error);
      
      // Handle network or unexpected error
      // setError('Error fetching user profile. Please try again later.');
    }
  };
    userProfileInformation();
    
  }, []);
 
  return (
    <View style={styles.textWrapper}>
      <View>
        <Text style={styles.textWelcome}>{t('WellcomeText')} {Data.user && Data.user.name ? Data.user.name : '' }👋</Text>
        <Text style={styles.textTravel}>{t('travel')}</Text>
      </View>

      <TouchableOpacity onPress={props.onPress}>
        {/* <MaterialCommunityIcons
          name="bell-badge-outline"
          size={sizes.bellSize}
        /> */}
           <Image
                source={require("../assets/imgs/makka1.jpg")}
                style={styles.image}
              />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textWelcome: {
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: sizes.welcomeText,
    color: colors.secondary,
  },
  textTravel: {
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: sizes.buttonTextSize,
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 45,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 42,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});

export default WelcomeText;
