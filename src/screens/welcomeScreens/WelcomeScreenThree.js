import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../../assets/Colors';
import sizes from '../../assets/Sizes';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext } from '../../Context/context';
import LanguageListener from '../../Context/LanguageListener';

const WelcomeScreenThree = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const navigation = useNavigation();

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    AsyncStorage.setItem('lang', newLanguage);  
    navigation.navigate('Auth');
  };

  const [loaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.pictureContainer}>
        <Image style={styles.picture} source={require('../../assets/imgs/logo-empty.png')} resizeMode="contain" />
      </View>

      <Text style={styles.textMain}>V 17.0</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleLanguageChange('ar')} style={styles.button}>
          {/* <Text style={styles.buttonText}>للغة العربية</Text> */}
          <Text style={styles.textSecondary}>طريقك لزيارة المواقع الإسلامية</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleLanguageChange('en')} style={styles.button}>
          <Text style={styles.textSecondary}>Your Way to Visit Islamic Destinations.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleLanguageChange('en')} style={styles.button}>
          <Text style={styles.textSecondary}>اسلامی مقامات پر جانے کا آپ کا طریقہ.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleLanguageChange('en')} style={styles.button}>
          <Text style={styles.textSecondary}>Cara Anda Mengunjungi Destinasi Islami.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textMain: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 15,
    color: colors.main,
    alignSelf: 'center',
    marginBottom: 10,
  },
  textSecondary: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.paragraphSize,
    color: colors.secondary,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginBottom:15,
    borderRadius: 5,
    elevation: 3,
    padding: 10,
    marginHorizontal:10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    color: colors.shadow,
    textAlign: 'center',
  },
  pictureContainer: {
    position: 'absolute',
    top: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 400,
    height: 250,
  },
});

export default WelcomeScreenThree;
