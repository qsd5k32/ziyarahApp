import React, { useEffect ,useState , useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import PropTypes from "prop-types"; // Import PropTypes for prop type checking
import { FontAwesome } from "@expo/vector-icons";
import colors from '../assets/Colors';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
const windowWidth = Dimensions.get("window").width;

const SearchResults = ({ route , navigation }) => {
  const { data } = route.params;

  // Check if data is an array before mapping over it
  const hasData = Array.isArray(data) && data.length > 0;
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);
useEffect(()=>{
  if (language !== null) {
    i18n.changeLanguage(language); // Change language here
    console.log('languageeeeenew', language);
  }
}, [language]);
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
  const isArabic = language === 'ar';

  const flexDirectionStyle = isArabic ? 'row' : 'row-reverse';
  return (
    <SafeAreaView style={styles.container}>
         <StatusBar translucent={false} backgroundColor={colors.shadow} />
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            {hasData ? (
              data.map((item, index) => (
                <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('Details', item)}>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.itemImage}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>
                      {item.name.length > 13
                        ? item.name.substring(0, 8) + "..."
                        : item.name}
                    </Text>
                    {item.location && (  
                      <View style={[styles.locationContainer , {flexDirection:flexDirectionStyle , }]}>
                        <FontAwesome name="map-marker" size={16} color={colors.shadow} />
                        <Text style={[styles.itemLocation , { [language === 'ar' ? 'right' : 'left']: 10,}]}>{item.location}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>Oops...No Data Found</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

SearchResults.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      data: PropTypes.array.isRequired, // Specify that data is expected to be an array
    }).isRequired,
  }).isRequired,
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: windowWidth * 0.05,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 8,
  },
  item: {
    width: windowWidth * 0.44,
    height: 220, // Increase the card height
    marginBottom: 16,
    borderRadius: 30,
    backgroundColor: colors.white,
    elevation: 20,
    // marginLeft:5,
  },
  itemImage: {
    width: "100%",
    height: 160,
    borderRadius: 30,
  },
  textContainer: {
    marginTop: 9,
    marginBottom: 7,
    marginHorizontal: 12,
  },
  itemTitle: {
    color: "#333",
    fontSize: windowWidth * 0.045,
    fontWeight:'600',
    fontFamily: "Tajawal",
    opacity: 0.85,  
  },
  locationContainer: {
    flexDirection: "row-reverse",
    // alignItems: "flex-start",  
    opacity: 0.6,  
  },
  itemLocation: {
    color: colors.shadow,
    fontWeight:'600',
    fontFamily: "Tajawal",
    fontSize: windowWidth * 0.035,
    marginLeft: 15,
    // marginTop: -15,
 
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  noDataContainer: {
    width: "100%",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataText: {
    fontSize: windowWidth * 0.055,
    color: colors.shadow,
    fontWeight: "bold",
  },
};

export default SearchResults;
