import React, { useState , useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ProfileHeader from './ProfileHeaderScreen';
import ProfileInfo from './ProfileInfo';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
const EditProfileScreen = ({ navigation }) => {
  useEffect(()=>{
    if (language !== null) {
      i18n.changeLanguage(language); // Change language here
      console.log('languageeeeenew', language);
    }
  }, [language]);
  // Sample data (replace with actual data from your backend or state management)
  const initialProfileData = {
    name: 'John Doe',
    bio: 'Travel enthusiast | Nature lover | Adventure seeker',
    profilePicture: require('../../assets/imgs/logo-empty.png'), // Replace with the actual profile picture
  };

  const [profileData, setProfileData] = useState(initialProfileData);

  const handleSaveProfile = () => {
    // Implement the logic to save the updated profile data
    // You can use an API call or state management to handle this
    console.log('Profile saved:', profileData);
    // After saving, navigate back to the ProfileScreen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ProfileHeader profileData={profileData} />

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Name</Text>
        <TextInput
          style={styles.input}
          value={profileData.name}
          onChangeText={(text) => setProfileData({ ...profileData, name: text })}
        />

        <Text style={styles.sectionTitle}>Bio</Text>
        <TextInput
          style={styles.input}
          value={profileData.bio}
          onChangeText={(text) => setProfileData({ ...profileData, bio: text })}
        />

        {/* Add more form components to capture additional profile information */}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditProfileScreen;
