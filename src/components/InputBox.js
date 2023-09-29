import React, { useState , useContext , useEffect } from 'react';
import { StyleSheet, View, Text,TextInput, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../assets/Colors';
import axios from 'axios';
import { LanguageContext } from '../Context/context';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
const SearchInput = ({ navigation }) => {
  const { language } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if (language !== null) {
      i18n.changeLanguage(language); // Change language here
      console.log('languageeeeenew', language);
    }
  }, [language]);
  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.get(`https://ziyarh.com/api/destinations/search?query=${searchQuery}` , {
        headers: {
          'lang' : language
        }
      });
      setSearchResults(response.data);
      setLoading(false);
  
      const data = response.data;
      navigation.navigate("SearchResults", { data: data.data }); // Access the array using data.data
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };
  
  
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
    <View style={styles.textBox}>
      <MaterialCommunityIcons
        name="magnify"
        size={40}
        style={styles.icon}
        color={colors.magnifyColor}
      />
      <TextInput
        style={styles.inputText}
        autoCapitalize="none"
        autoCorrect={true}
        placeholder={t('search')}
        maxLength={15}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
        value={searchQuery}
      />
      {loading && <ActivityIndicator style={styles.loadingIndicator} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
  },
  icon: {
    marginLeft: 15,
    marginRight: 5,
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 40,
    marginTop: 15,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
  },
});

export default SearchInput;
