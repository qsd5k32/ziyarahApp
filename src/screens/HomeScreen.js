import React, { useEffect ,useState , useContext} from 'react';
import { View, Text, TextInput, StyleSheet,StatusBar, ScrollView, TouchableOpacity,SafeAreaView,
  Image,FlatList,ImageBackground,
  Dimensions,
  Modal,
  Picker, } from 'react-native';
import WelcomeText from '../components/WelcomeText';
import InputBox from '../components/InputBox';
import Offer from '../components/Offer';
import { useFonts } from 'expo-font';
import sizes from '../assets/Sizes';
import colors from '../assets/Colors';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FilterBottomSheet from '../components/ToggalModal';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

const { width, height } = Dimensions.get("screen");
const windowWidth = Dimensions.get("window").width;
 
const HomeScreen = ({navigation}) => {

  const [accessToken, setAccessToken] = useState('');
 const [ApiData, setApiData] = useState({});
const [Name, setName] = useState({});
const [Data, setData] = useState({}); // Add Data state
const { language: currentLanguage, changeLanguage } = useContext(LanguageContext);
const { t, i18n } = useTranslation();
const { language } = useContext(LanguageContext);
const [open, setOpen] = useState(false);
const [items] = useState([
  { label: t('English'), value: 'en' },
  { label: t('Arabic'), value: 'ar' },
]);
const [modalVisible, setModalVisible] = useState(false);
const [selectedLanguage, setSelectedLanguage] = useState(language);
  let [fontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
    ElMessiri: require('../assets/fonts/ElMessiri.ttf'),
    Cairo: require('../assets/fonts/Cairo.ttf'),
    Tajawal: require('../assets/fonts/Tajawal.ttf'),
  });

  useEffect(() => {
    axios
      .get('https://ziyarh.com/api/destinations' , {
        headers: {
          'lang' : language
        }
      })
      .then((response) => {
        const apiDataa = response.data.data;
        setApiData(response.data.data)

        // Convert the API data to the format expected by the Card component
        const newData = apiDataa.map((item) => ({
          id: item.id, // Use the actual 'id' from the API as the unique key
          header: item.name,
 
          image: { uri: item.thumbnail },
        }));
 
       
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    // Your font loading code here
    if (!fontsLoaded) {
      // Handle font loading error here
    }
  }, [fontsLoaded]);
useEffect(()=>{
  if (language !== null) {
    i18n.changeLanguage(language); // Change language here
    console.log('languageeeeenew', language);
  }
}, [language]);

  const handleMakkahPress = () => {
    axios
    .get("https://ziyarh.com/api/destinations/search?cities[]=1", {
      headers: {
        'lang': language, 
      },
    })
    .then(response => {
      const data = response.data.data.map(item => ({
        ...item,
        location: t('makkah')// Add the city number to each item
      }));
      console.log(data);
      navigation.navigate("SearchResults", { data });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      // Handle error (show a message, retry, etc.)
    });
  };

  const handleMadinahPress = () => {
    axios
      .get("https://ziyarh.com/api/destinations/search?cities[]=2", {
        headers: {
          'lang': language, 
        },
      })
      .then(response => {
        const data = response.data.data.map(item => ({
          ...item,
          location: t('madinah') // Add the city number to each item
        }));
        console.log(data);
        navigation.navigate("SearchResults", { data });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        // Handle error (show a message, retry, etc.)
      });
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token !== null) {
          setAccessToken(token);

          const response = await fetch('https://ziyarh.com/api/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              'lang': language,
            },
          });
          const responseData = await response.json();

          if (response.ok) {
            setData(responseData);  
            setName(responseData.user.name);
          } else {
            console.error('Profile User Error:', response.status, responseData);
            if (response.status === 401) {
             } else {  }   } } }
              catch (error) {
        console.error('Profile User Error:', error);
      }
    }

    fetchData();
  }, []);


  const isArabic = language === 'ar';

  const flexDirectionStyle = isArabic ? 'row' : 'row-reverse';

    const categoryIcons = [
        <TouchableOpacity >
 <FilterBottomSheet/>
            <Icon name="edit-location" size={40} color={colors.primary} />
            <Text style={[styles.textDest , {left:language === 'ar' ? -5 : -169 }]}>{t('filter')}</Text>
        </TouchableOpacity>,

        <TouchableOpacity onPress={handleMadinahPress}>
            <Image
                   source={require("../assets/imgs/mosque.png")}
                   style={styles.headerImage}
                />
                <Text style={[styles.textDest , {left: language === 'ar' ? -20 : -157}]}>{t('madinah')}</Text>
        </TouchableOpacity>,
           <TouchableOpacity onPress={handleMakkahPress}>
            <Image
            source={require("../assets/imgs/kaaba.png")}
            style={styles.headerImage}
          />
          <Text style={[styles.textDest , {left:language === 'ar' ? -15 : -159}]}>{t('makkah')}</Text>
        </TouchableOpacity>,
      ];
      const ListCategories = () => {
        return (
          <View style={styles.categoryContainer}>
            {categoryIcons.map((icon, index) => (
              <View key={index} style={styles.iconContainer}>
                {icon}
              </View>
            ))}
          </View>
        );
      };
      const PlacesCard = ({place}) => {
          const image = {uri:place.thumbnail};
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Details', place)}>
            <ImageBackground style={styles.cardImage} source={image}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 20,
                  fontWeight: '600',
                  marginTop: 10,
                  fontFamily: "Tajawal"
                }}>
                {place.name}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
              
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      };
  const [destinations, setDestinations] = useState([]);


  useEffect(() => {
    axios
      .get('https://ziyarh.com/api/destinations', {
        headers: {
          'lang': language,
        },
      })
      .then((response) => {
        const apiDataa = response.data.data;
        setApiData(apiDataa);  
        // ...
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

const handleSaveLanguage = () => {
  // Save the selected language to AsyncStorage or any other storage mechanism
  AsyncStorage.setItem('selectedLanguage', selectedLanguage);
  setModalVisible(false);
};

const handleLanguageChange = (newLanguage) => {
  setSelectedLanguage(newLanguage); // Update the selected language in local state
};
const handleSubmit = async () => {
  changeLanguage(selectedLanguage); // Change the language in context
  AsyncStorage.setItem('lang', selectedLanguage);
  navigation.navigate('Home'); // Navigate to the desired screen
  setModalVisible(false);
};
const destination = destinations;

  return (
    <ScrollView style={styles.container}>

   <StatusBar translucent={false} backgroundColor={colors.primary} />
   <View style={styles.header}>
  {/* ...other header content */}
  <TouchableOpacity onPress={() => setModalVisible(true)}>
    <Icon name="settings" size={28} color={colors.primary} />
  </TouchableOpacity>
</View>

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{t('selectLanguage')}</Text>
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
              labelStyle={{ color: colors.primary, fontSize: 15, fontWeight: '600', fontFamily: 'Tajawal' }}
              placeholderStyle={{ color: colors.primary, fontSize: 15, fontWeight: '600', fontFamily: 'Tajawal' }}
              setValue={setSelectedLanguage}
            />
          </View>
      <TouchableOpacity onPress={handleSubmit}  style={styles.saveButton}>
        <Text style={styles.submitButtonText}>{t('Submit')}</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      {/* <View style={styles.header}>
        <Icon name="" size={28} color={colors.white} />
        {/* <Text style={styles.textTravel}>Let’s Travel Now</Text> */}
        <Icon name="" size={20} color={colors.white}/>
      {/* </View> */} 
      <InputBox  navigation={navigation}  />
      <WelcomeText  onPress={() => props.navigation.navigate('MenuScreen')} />
 
      {/* <Offer navigation={navigation} /> */}
<View>
<Text style={styles.headerTitle}>{t('choose')} </Text>
        <ListCategories />
</View>

      <SafeAreaView style={styles.container}>
        <View style={{display:'flex', width:'100%', flexDirection:flexDirectionStyle,
        justifyContent:'space-between',
         padding:20
         }}>
      <Text style={styles.sectionTitle}>{t('Place')}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Dist')} >
      <Text style={{
    textDecorationLine:'underline',  
    fontWeight: '600',
    // fontSize: 20,
    color:colors.green,
    fontFamily: "Tajawal"}} >{t('more')}</Text>
      </TouchableOpacity>
        </View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={destination}
            renderItem={({ item }) => <PlacesCard place={item} />}
          />
        </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
        </View>
      </ScrollView>
    </SafeAreaView>


      {/* <View style={styles.wrapper}>
        <Text style={styles.textCategory}></Text>
        <TouchableOpacity>
          <Text style={styles.textView}></Text>
        </TouchableOpacity>
      </View> */}
   

      
      <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            {ApiData.length > 0  ? (
              ApiData.map((item, index) => (
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
    
  );
};

const styles = StyleSheet.create({
  textView: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.menuText,
    color: colors.secondary,
    marginRight: 25,
  },
  textCategory: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.buttonTextSize,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 35,
    marginBottom: 14,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
  scrollViewContent: {
    // flexGrow: 1,
  },
//   header: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
  headerText: {
    fontSize: 45,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  headerImage: {
    width: 40,
    height: 40,
    // borderRadius: 50,
  },
  contentContainer: {
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  imageView: {
    width: width / 2.4,
    height: height / 3.5,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: colors.secondary2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: colors.primary,
  },
  headerTitle: {
    fontFamily: "Tajawal",
    fontWeight: '600',
    // fontSize: sizes.buttonTextSize,
    color:colors.green,
    marginBottom:-60,
    padding:20, 
    fontSize:20
    
  },
  textTravel: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: sizes.buttonTextSize,
    color:colors.white
  },
  textDest:{
    position:'absolute',
    top:60,
    fontWeight:'600',
    fontFamily: "Tajawal",
    width:200
  },
  sectionTitle: {
    // marginHorizontal: 20,
    // marginVertical: 20,
    fontWeight: '600',
    fontSize: 20,
    color:colors.green,
    fontFamily: "Tajawal"
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
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
    color: colors.magnifyColor,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgTrans,
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Tajawal',
    fontWeight: '600',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 57,
    width: '50%',
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'Tajawal',
    fontWeight: '600',
    fontSize: 16,
  },
});


  export default HomeScreen;
