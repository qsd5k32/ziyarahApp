import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions ,Image , TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import colors from '../assets/Colors';
const { width } = Dimensions.get('screen');

const EditProfileScreen = ({ route, navigation }) => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [items, setItems] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  const { userData } = route.params; 
console.log(userData.information)
  const [country, setCountry] = useState(userData.information.country_id || '');
  const [city, setCity] = useState(userData.information.city || '');
  const [address, setAddress] = useState(userData.information.address || '');


  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (language !== null && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    // Fetch and populate dropdown items
    fetchDropdownItems();
  }, [language]);

  const fetchDropdownItems = async () => {
    try {
      const apiUrl = 'https://ziyarh.com/api/countries';
      const headers = new Headers();
      headers.append('lang', language);

      const response = await fetch(apiUrl, { headers });
      const responseData = await response.json();
      
      console.log("ccccccccccccccccccc" , responseData.data )
      if (Array.isArray(responseData.data)) {
        const names = responseData.data.map((destination) => ({
          label: destination.name,
          value: destination.id,
        }));
        setItems(names);
        const selectedCountry = responseData.data.find(country => country.id === userData.information.country_id);

        // Check if a matching country was found
        if (selectedCountry) {
          const countryName = selectedCountry.nicename;
          setCountry(countryName);
        }
      } else {
        console.error('Response data is not an array:', responseData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 
  const handleSubmit = async () => {
    const updatedData = {
      country,
      city,
      address,
    };

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token !== null) {
        const response = await fetch('https://ziyarh.com/api/profile/information', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        });

        const responseData = await response.json();

        if (response.ok) {
          console.log('Profile Update Response:', responseData);
        } else {
          console.error('Profile Update Error:', response.status, responseData);
        }
      }
    } catch (error) {
      console.error('Profile Update Error:', error);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
              <View style={{ width: "100%",  borderBottomLeftRadius: 200, borderBottomRightRadius: 200, overflow: 'hidden' , backgroundColor:"#eee" , marginTop:-40 }}>
  <Image source={require('../assets/imgs/edit.png')} style={{ width: "100%", height: 300 ,borderBottomLeftRadius: 250, borderBottomRightRadius: 250, }} />
</View >
      <View style={{width: '100%', justifyContent: 'center',
    alignItems: 'center'}}>
        <Text style={styles.title}>{t('EditProfile')}</Text>
        <DropDownPicker
          open={open}
          value={selectedCity}
          items={items}
          defaultValue={selectedCity}
          placeholder={country}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          onChangeItem={(item) => setSelectedCity(item.value)}
          setOpen={setOpen}
          labelStyle={styles.dropdownLabel}
          placeholderStyle={styles.dropdownPlaceholder}
          setValue={setCountry}
          setItems={setItems}
          listItemLabelStyle={styles.dropdownItemLabel}
        />
      <TextInput
        style={styles.input}
        placeholder={t('City')}
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder={t('Address')}
        value={address}
        onChangeText={setAddress}
      />
         <TouchableOpacity onPress={handleSubmit}  style={styles.saveButton}>
        <Text style={styles.submitButtonText}>{t('Submit')}</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      color: colors.primary,
      fontFamily: 'Tajawal',
      fontWeight: '600',
      marginBottom: 20,
    },
    input: {
      width: '60%',
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
    item: {
      marginBottom: 10,
    },
    dropdownContainer: {
      marginBottom: 10,
      width:'60%'
    },
    dropdown: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 15,
    },
    dropdownLabel: {
      color: 'green',
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Tajawal',
      marginLeft: 17,
    },
    dropdownPlaceholder: {
      color: 'green',
      fontSize: 15,
      fontWeight: '600',



      fontFamily: 'Tajawal',
      marginLeft: 12,
    },
    dropDownContainerStyle: {
      borderColor: '#7abe7a',
      borderWidth: 1,
      borderTopWidth: 0,
      borderRadius: 30,
      padding: 15,
    },
    button: {
      backgroundColor: 'green',
      borderRadius: 40, // Rounded border
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start', // Align button to the left
      marginTop: 10, // Add some margin to separate it from the inputs
    },
    buttonText: {
      color: 'white', // Text color
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Tajawal',
    },
    saveButton: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 20,
      alignItems: 'center',
      // marginTop: 10,
      // marginLeft: 70,
      width: '50%',
    },
  
    submitButtonText: {
      color: '#fff',
      fontFamily: 'Tajawal',
      fontWeight: '600',
      fontSize: 16,
    },
    
  });
  

export default EditProfileScreen;