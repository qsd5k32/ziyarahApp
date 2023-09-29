import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
import { LanguageContext } from '../../Context/context';

const SettingsScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat.ttf'),
    ElMessiri: require('../../assets/fonts/ElMessiri.ttf'),
    Cairo: require('../../assets/fonts/Cairo.ttf'),
    Tajawal: require('../../assets/fonts/Tajawal.ttf'),
  });

  useEffect(() => {
    // Your font loading code here
    if (!fontsLoaded) {
      // Handle font loading error here
    }
  }, [fontsLoaded]);

  const { t, i18n } = useTranslation();
  const { language: currentLanguage, changeLanguage } = useContext(LanguageContext);

  const [notifications, setNotifications] = useState(false);
  const [location, setLocation] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage); // Store the selected language in local state
  const [items] = useState([
    { label: t('English'), value: 'en' },
    { label: t('Arabic'), value: 'ar' },
  ]);

  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage); // Update the selected language in local state
  };

  const handleSubmit = async () => {
    changeLanguage(selectedLanguage); // Change the language in context
    AsyncStorage.setItem('lang', selectedLanguage); // Save the selected language in AsyncStorage
    navigation.navigate('Home'); // Navigate to the desired screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{t('Notifications')}</Text>
        <View style={[styles.switchContainer, { flexDirection: currentLanguage === 'ar' ? 'row' : 'row-reverse' }]}>
          <FeatherIcon name="bell" size={20} color="#0c0c0c" />
          <Text style={styles.switchLabel}>{t('EnableNotifications')}</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{t('Location')}</Text>
        <View style={[styles.switchContainer, { flexDirection: currentLanguage === 'ar' ? 'row' : 'row-reverse' }]}>
          <FeatherIcon name="map-pin" size={20} color="#0c0c0c" />
          <Text style={styles.switchLabel}>{t('EnableLocation')}</Text>
          <Switch value={location} onValueChange={setLocation} />
        </View>
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate('SettingItem')}>
        <Text style={styles.sectionHeader}>{t('Language')}</Text>
        </TouchableOpacity>
        {/* <View style={{ justifyContent: 'space-between', flexDirection: currentLanguage === 'ar' ? 'row' : 'row-reverse' }}>
          <View style={{ padding: 20 }}>
            <DropDownPicker
              open={open}
              value={selectedLanguage}
              items={items}
              defaultValue={selectedLanguage}
              placeholder={currentLanguage === 'ar' ? t('Arabic') : t('English')}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              onChangeItem={(item) => handleLanguageChange(item.value)}
              setOpen={setOpen}
              labelStyle={{ color: 'green', fontSize: 15, fontWeight: '600', fontFamily: 'Tajawal' }}
              placeholderStyle={{ color: 'green', fontSize: 15, fontWeight: '600', fontFamily: 'Tajawal' }}
              setValue={setSelectedLanguage}
            />
          </View>
        </View> */}
      </View>
      {/* <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>{t('Submit')}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  switchContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 10,
    fontFamily: 'Tajawal',
    fontWeight: '600',
  },
  switchLabel: {
    marginLeft: 10,
    fontFamily: 'Tajawal',
    fontWeight: '600',
  },
  dropdownContainer: {},
  dropdown: {
    borderWidth: 1,
    borderColor: '#7abe7a',
    borderRadius: 40,
    width: 120,
    fontFamily: 'Tajawal',
    fontWeight: '600',
  },
  dropDownContainerStyle: {
    borderColor: '#7abe7a',
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 30,
    padding: 10,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: 'Tajawal',
    fontWeight: '600',
    color: '#0c0c0c',
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 11,
    alignItems: 'center',
    marginTop: 80,
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'Tajawal',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SettingsScreen;
