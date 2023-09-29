import React, { useEffect ,useState , useContext} from 'react';

import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Card from '../components/DistCard';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Luxury = () => {
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
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);
useEffect(()=>{
  if (language !== null) {
    i18n.changeLanguage(language); // Change language here
    console.log('languageeeeenew', language);
  }
}, [language]);
  const [cardData, setCardData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch data from the API using axios
    axios
      .get('https://ziyarh.com/api/destinations' , {
        headers: {
          'lang' : language
        }
      })
      .then((response) => {
        const apiData = response.data.data;

        // Convert the API data to the format expected by the Card component
        const newData = apiData.map((item) => ({
          id: item.id, // Use the actual 'id' from the API as the unique key
          header: item.name,
          result: '5.0', // Replace with the appropriate rating value
          reviews: '500', // Replace with the appropriate number of reviews
          image: { uri: item.thumbnail },
        }));

        // Update the cardData state with the fetched data
        // setCardData(newData);
        setCardData(apiData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCardPress = (place) => {
    // Check if the id exists and is not null or undefined
    if (place !== null && place !== undefined) {
      // Navigate to the detailed view screen with the destination ID as parameter
     console.log("place disttttt:" , place)
      navigation.navigate('Details', place );

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cardData}
        renderItem={({ item }) => (
          <Card
            header={item.name}
            result={item.result}
            reviews={item.reviews}
            image={item.thumbnail}
            onPress={() => handleCardPress(item)}
            key={item.id.toString()} // Use the 'id' as a key for the FlatList item
          />
        )}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={(item) => item.id.toString()} // Use keyExtractor for FlatList key
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  flatListContent: {
    paddingVertical: 16, // Adjust top spacing for the FlatList items
    paddingHorizontal: 8,
    alignItems: 'center',
  },
});

export default Luxury;