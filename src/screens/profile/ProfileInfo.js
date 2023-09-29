import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileInfo = ({ contactDetails }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Contact Details</Text>
      <Text style={styles.infoText}>Email: {contactDetails.email}</Text>
      <Text style={styles.infoText}>Phone: {contactDetails.phone}</Text>
      {/* Add more contact details or other information as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProfileInfo;
