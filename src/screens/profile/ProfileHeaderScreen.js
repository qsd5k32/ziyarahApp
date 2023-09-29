import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileHeader = ({ profileData }) => {
  return (
    <View style={styles.container}>
      <Image source={profileData.profilePicture} style={styles.profilePicture} />
      <Text style={styles.name}>{profileData.name}</Text>
      <Text style={styles.bio}>{profileData.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileHeader;
