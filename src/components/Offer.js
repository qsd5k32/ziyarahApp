import React, { useContext, useEffect , useState } from 'react';
import { LanguageContext } from '../Context/context';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import colors from '../assets/Colors';
import sizes from '../assets/Sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';


const Offer = () => {
 
  const [accessToken, setAccessToken] = useState('');
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);
  
    useEffect(() => {
      async function getTokenFromStorage() {
        const token = await AsyncStorage.getItem('accessToken');
        if (token !== null) {
          setAccessToken(token);
          console.log(token);
        }
      }
      getTokenFromStorage();

      
      if (language !== null) {
        i18n.changeLanguage(language); // Change language here
        console.log('languageeeeenew', language);
      }
  }, [language]);

  const handleJoinPress = () => {
    navigation.navigate('Auth');
  };
  const isArabic = language === 'ar';

  const flexDirectionStyle = isArabic ? 'row' : 'row-reverse';
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
  return (
    <View style={[styles.wrapper , {flexDirection:flexDirectionStyle}]}>
      <View style={[styles.sectionOne , {
         [language === 'ar' ? 'paddingLeft' : 'paddingRight']: 20,
      }]}>
        <Text style={styles.textHeader}>{t('Deal')}</Text>
        <Text style={styles.textParagraph}>{t('offer')}</Text>
        {accessToken === '' && (
          <TouchableOpacity style={styles.buttonContainer} onPress={handleJoinPress}>
            <Text style={styles.buttonText}>{t('join')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.sectionTwo}>
        <Image source={require('../assets/imgs/backpack.png')} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.buttonTextSmall,
    color: colors.white,
    padding: 9,
  },
  buttonContainer: {
    backgroundColor: colors.green,
    borderRadius: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  sectionTwo: {
    marginLeft: -20,
  },
  sectionOne: {
    width: 180,
    paddingTop: 60,
    paddingLeft: 18,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  textParagraph: {
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: sizes.paragraphSizeSmaller,
    color: colors.secondary,
    marginBottom: 26,
    marginHorizontal: -1,
  },
  textHeader: {
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: sizes.menuText,
    marginBottom: 6,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: -7,
  },
  offerContainer: {
    height: 180,
    marginHorizontal: 35,
    marginBottom: 45,
    borderRadius: 30,
    elevation: 20,
  },
});

export default Offer;