import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, PermissionsAndroid , Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import { useFonts } from 'expo-font';

const TourBooking = ({ route }) => {
  let [fontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
    ElMessiri: require('../assets/fonts/ElMessiri.ttf'),
    Cairo: require('../assets/fonts/Cairo.ttf'),
    Tajawal: require('../assets/fonts/Tajawal.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) {
     }
  }, [fontsLoaded]);

  const { scheduleId } = route.params;
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (language !== null) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const [passengers, setPassengers] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  const getDataFromAsyncStorage = async () => {
    try {
      const savedPassengers = await AsyncStorage.getItem('passengers');
      const savedAddress = await AsyncStorage.getItem('address');

      if (savedPassengers !== null) {
        setPassengers(savedPassengers);
      }
      if (savedAddress !== null) {
        setAddress(savedAddress);
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  const handleDetectLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
            // Update the address input with the coordinates
            setAddress(`${latitude}, ${longitude}`);
          },
          (error) => {
            console.error('Error getting current location:', error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };
 

  const handleBookingSubmit = async () => {
    try {
      const authToken = await AsyncStorage.getItem('accessToken');
  
      const res = await axios.post(
        'https://ziyarh.com/api/booking',
        {
          address,
          lat: '',
          lng: '',
          passengers,
          tour_schedule_id: scheduleId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            'lang': language,
          },
        }
      );
  
      if (res.data.status === 'success') {
        const bookingId = res.data.data.id;
        console.log('Booking ID:', bookingId);
  
        const response = await axios.post(
          `https://ziyarh.com/api/payment?booking_id=${bookingId}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
              'lang': language,
            },
          }
        );
  
        console.log('Booking payment:', response);
  
        const paymentURL = response.data.data;
  
         Linking.openURL(paymentURL)
          .then(() => {
             
            navigation.navigate('Home');  
          })
          .catch((err) => console.error('Error opening URL in browser:', err));
      } else {
        console.error('Booking failed:', res.data.status);
      }
  
      await AsyncStorage.setItem('passengers', passengers);
      await AsyncStorage.setItem('address', address);
  
      setPassengers('');
      setAddress('');
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  return (
    <View style={styles.container}>
         <View style={{ borderBottomLeftRadius: 250, borderBottomRightRadius: 250, overflow: 'hidden' , backgroundColor:"#eee" , marginTop:-30 }}>
  <Image source={require('../assets/imgs/Journey-pana.png')} style={{ width: 500, height: 300 ,borderBottomLeftRadius: 250, borderBottomRightRadius: 250, }} />
</View>
<View style={{width: '100%', justifyContent: 'center',
    alignItems: 'center'}}>

      <Text style={styles.title}>{t('TourBooking')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('NumberOfPassengers')}
        keyboardType="numeric"
        value={passengers}
        onChangeText={setPassengers}
      />
      <TextInput
        style={styles.input}
        placeholder={t('Address')}
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.detectButton} onPress={handleDetectLocation}>
        <Text style={styles.detectButtonText}>{t('DetectLiveLocation')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookButton} onPress={handleBookingSubmit}>
        <Text style={styles.bookButtonText}>{t('BookNow')}</Text>
      </TouchableOpacity>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontFamily: "Tajawal",
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  detectButton: {
    backgroundColor: '#ffc527c4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
    elevation: 5,
  },
  detectButtonText: {
    color: 'white',
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: "#007A00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: 16,
  },
});

export default TourBooking;