import React, { useState , useEffect , useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import colors from '../assets/Colors';
const EditProfileScreen = ({ route, navigation }) => {
  const { language } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  useEffect(()=>{
    if (language !== null) {
      i18n.changeLanguage(language); // Change language here
      console.log('languageeeeenew', language);
    }
  }, [language]);
  const { userData } = route.params; // Get the user data passed from ProfileScreen

  // Initialize form fields with existing user data
  const [name, setName] = useState(userData.name || '');
  const [email, setEmail] = useState(userData.email || '');
  const [phone, setPhone] = useState(userData.phone || '');

  const handleSubmit = async () => {
    // Prepare the updated data object based on form fields
    const updatedData = {
      name,
      email,
      phone,
    };

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token !== null) {
        // Send a request to update the profile data
        const response = await fetch('https://ziyarh.com/api/profile/edit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          // Successfully updated profile data
          console.log('Profile Update Response:', response.status);
          // Pass the updated data back to the ProfileScreen using the callback
          // route.params.onProfileDataUpdate(updatedData);
          navigation.goBack();
        } else {
          console.error('Profile Update Error:', response.status);
        }
      }
    } catch (error) {
      console.error('Profile Update Error:', error);
    }
  };

  return (
    <View style={styles.container}>
            <View style={{ width: "100%",  borderBottomLeftRadius: 200, borderBottomRightRadius: 200, overflow: 'hidden' , backgroundColor:"#eee" , marginTop:-40 }}>
  <Image source={require('../assets/imgs/edit.png')} style={{ width: "100%", height: 300 ,borderBottomLeftRadius: 250, borderBottomRightRadius: 250, }} />
</View >
<View style={{width: '100%', justifyContent: 'center',
    alignItems: 'center'}}>

      <Text style={styles.title}>{t('EditProfile')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Name")}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder={t("Email")}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder={t("PhoneNumber")}
        value={phone}
        onChangeText={setPhone}
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
