import React, { useEffect ,useState , useContext} from 'react';
import { useFonts } from 'expo-font';
import { SafeAreaView, View, Text, ScrollView, Button, Modal, TextInput, TouchableOpacity, StyleSheet , Dimensions } from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import colors from '../assets/Colors';
// import FilterBottomSheet from '../src/Test3'
const { width, height } = Dimensions.get('screen');

const SIZES = {
    h1: 22,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,

    width,
    height,
}
const FilterBottomSheet = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedTransportation, setSelectedTransportation] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [items, setItems] = useState([  ]);
    const [location, setLocation] = useState();
    const [cuisines, setCuisines] = useState("");
    const [city, setCity] = useState(0);
    const [tourTime, setTourTime] = useState(0);
    const [transportation, setTransportation] = useState(0);
    const [priceRange, setPriceRange] = useState([0, 200]);
    const handlePriceRangeChange = (values) => {
      setPriceRange(values);
    };
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const { t, i18n } = useTranslation();
    const { language } = useContext(LanguageContext);
  
    const [data, setData] = useState(null);
const navigation = useNavigation();
DropDownPicker.setListMode("SCROLLVIEW");
useEffect(() => {
  // Define the API endpoint URL
  const apiUrl = 'https://ziyarh.com/api/destinations';

  // Define the headers with the language
  const headers = new Headers();
  headers.append('lang', language); // Replace 'en' with the desired language value

  // Make the API call using the fetch API
  fetch(apiUrl, { headers })
    .then((response) => response.json())
    .then((responseData) => {
      if (Array.isArray(responseData.data)) { // Check if responseData is an array
        const names = responseData.data.map((destination) => ({
          label: destination.name,
          value: destination.id,
         
        }));
        setItems(names);
      } else {
        console.error('Response data is not an array:', responseData);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);
useEffect(() => {
  if (language !== null && i18n.language !== language) {
    i18n.changeLanguage(language); // Change language here
    console.log('languageeeeenew', language);
  }
}, [language]);
 
const isArabic = language === 'ar';

const flexDirectionStyle = isArabic ? 'row' : 'row-reverse';
const applyFilters = () => {
  // Prepare the API endpoint and query parameters
  const baseUrl = 'https://ziyarh.com/api/filter/tour';
  const queryParams = [];

  if (city) {
    queryParams.push(`cities[]=${city}`);
  }
  if (transportation) {
    queryParams.push(`vehicles[]=${transportation}`);
  }
  if (tourTime) {
    queryParams.push(`tourTime=${tourTime}`);
  }
  if (selectedCity) {
    queryParams.push(`destination=${selectedCity}`);
  }
  if (priceRange) {
    queryParams.push(`price[]=${priceRange[0]}`);
    queryParams.push(`price[]=${priceRange[1]}`);
  }

  // Construct the final API URL
  const apiUrl = `${baseUrl}?${queryParams.join('&')}`;
  console.log(apiUrl);

  // Define the headers with the language
  const headers = new Headers();
  headers.append('lang', language); // Replace 'language' with the desired language value

  // Make the API call with the headers
  fetch(apiUrl, { headers })
    .then((response) => response.json())
    .then((data) => {
      // Handle the API response data here
      console.log('API Response:', data);

      // Set the data state and navigate to the 'filter' screen
      setData(data);
      navigation.navigate('filter', data); // Replace 'filter' with the actual screen name

      // Close the modal or perform any other actions as needed
      toggleModal();
    })
    .catch((error) => {
      // Handle any API errors here
      console.error('Error fetching data:', error);
    });
};
      
      
      const clearFilters = () => {
         setCity(0);
        setTransportation(0);
        setTourTime(0);
        setPriceRange([0, 200]);
        setSelectedCity("")
      
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
      <View>
        <TouchableOpacity  style={styles.btn} title="fdfd" onPress={toggleModal} />
  
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
          <ScrollView >
            <View style={styles.modalContent}>
            <View style={styles.line} />
            <Icon name="window-close" size={30} color={colors.primary}  onPress={toggleModal} style={{position:'absolute' , 
            top:45 ,
            [language === 'ar' ? 'right' : 'left']: 25,
             zIndex:999,}} />
            <View style={styles.item}>
                    <Text style={styles.title}>{t("SelectCity")}</Text>
                    <View style={[styles.row , { flexDirection: flexDirectionStyle}]}>
                        <TouchableOpacity
                            onPress={() => {
                                setCity(1)
                            }}
                            style={[styles.category, { borderColor: city === 1 ? colors.primary : colors.gray }]}
                        >
                            <Text style={[styles.subtitle, { color: city === 1 ? colors.primary : colors.gray }]}>{t("makkah")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCity(2)
                            }}
                            style={[styles.category, { borderColor: city === 2 ? colors.primary : colors.gray }]}
                        >
                            <Text style={[styles.subtitle, { color: city === 2 ? colors.primary : colors.gray }]}>{t("madinah")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>{t('tourTime')}</Text>
                    <View style={[styles.row , { flexDirection: flexDirectionStyle}]}>
                    <TouchableOpacity
                            onPress={() => {
                                setTourTime(1)
                            }}
                            style={[styles.category, { borderColor: tourTime === 1 ? colors.primary : colors.gray }]}
                        >
                            <Text style={[styles.subtitle, { color: tourTime === 1 ? colors.primary : colors.gray }]}>{t('Morning')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setTourTime(2)
                            }}
                            style={[styles.category, { borderColor: tourTime === 2 ? colors.primary : colors.gray }]}
                        >
                            <Text style={[styles.subtitle, { color: tourTime === 2 ? colors.primary : colors.gray }]}>{t('Evening')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setTourTime(3)
                            }}
                            style={[styles.category, { borderColor: tourTime === 3 ? colors.primary : colors.gray }]}
                        >
                            <Text style={[styles.subtitle, { color: tourTime === 3 ? colors.primary : colors.gray }]}>{t('MidDay')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.item}>
              <Text style={styles.title}>{t('Destination')}</Text>
              <DropDownPicker
         open={open}
         value={selectedCity}
        items={items} 
        defaultValue={selectedCity}
        placeholder={t('choose')}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        onChangeItem={(item) => setSelectedCity(item.value)}
         setOpen={setOpen}
         labelStyle={{color: 'green', fontSize: 16 ,  fontWeight:'600',
         fontFamily: "Tajawal",marginLeft:17  }}
         placeholderStyle={{  color: 'green', fontSize: 15, fontWeight:'600',
         fontFamily: "Tajawal", marginLeft:12  }}
              setValue={setSelectedCity}
              setItems={setItems}
           
              listItemLabelStyle={{color: 'gray', fontWeight:'600',
              fontFamily: "Tajawal", fontSize:15  }}
      />
            

     
    </View>
                <View style={styles.item}>
                    <Text style={styles.title}>{t('Transportation')}</Text>
                    <View style={[styles.row , { flexDirection: flexDirectionStyle}]}>
                        <TouchableOpacity
                            onPress={() => {
                                setTransportation(1)
                            }}
                            style={[styles.category, { borderColor: transportation === 1 ? colors.primary : colors.gray }]}
                        >
                            <Text style={[styles.subtitle, { color: transportation === 1 ? colors.primary : colors.gray }]}>{t('BusSmall')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setTransportation(2)
                            }}
                            style={[styles.category, { borderColor: transportation === 2 ? colors.primary : colors.gray }]}
                        >
                            <Text style={[styles.subtitle, { color: transportation === 2 ? colors.primary : colors.gray }]}>{t('BusLarge')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setTransportation(3)
                            }}
                            style={[styles.category, { borderColor: transportation === 3 ? colors.primary : colors.gray }]}
                        >
                            <Text style={[styles.subtitle, { color: transportation === 3 ? colors.primary : colors.gray }]}>{t('Bus2Deck')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setTransportation(4)
                            }}
                            style={[styles.category, { borderColor: transportation === 4 ? colors.primary : colors.gray }]}
                        >
                            <Text style={[styles.subtitle, { color: transportation === 4 ? colors.primary : colors.gray }]}>{t('Carsedan')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setTransportation(5)
                            }}
                            style={[styles.category, { borderColor: transportation === 5 ? colors.primary : colors.gray }]}
                        >
                            <Text style={[styles.subtitle, { color: transportation === 5 ? colors.primary : colors.gray }]}>{t('Car4Wheel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>{t('Price')}</Text>
                
                        <MultiSlider
        values={priceRange}
        sliderLength={300}
        min={0}
        max={200}
        step={1}
        onValuesChange={handlePriceRangeChange}
        selectedStyle={{ backgroundColor: 'green' }}
        unselectedStyle={{ backgroundColor: 'silver' }}
        markerStyle={{ backgroundColor: 'green' }}
        containerStyle={styles.sliderContainer}
        trackStyle={styles.sliderTrack}
        selectedMarkerStyle={styles.sliderSelectedMarker}
        unselectedMarkerStyle={styles.sliderUnselectedMarker}
      />
       <Text style={styles.sliderValue}>
        {t('FromTo')}: {priceRange[0]} {t('R')} - {priceRange[1]} {t('R')}
      </Text>
                </View>
                <View style={{flexDirection:flexDirectionStyle , justifyContent:'space-around' , marginBottom:10}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        toggleModal();
                        applyFilters();

                      }}                >
                    <Text style={styles.buttonTxt}>{t('filter')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ 
                        backgroundColor: 'green',
                        borderRadius: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width:60,    
                    }}
                    onPress={clearFilters}
                               >
                    <Text style={styles.buttonTxt}>{t('Clear')}</Text>
                </TouchableOpacity>
                </View>
            </View>
               
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  };
  export default FilterBottomSheet;
  const styles = {
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: colors.bgTrans2,
      
    },
    modalContent: {
      backgroundColor:colors.white,
      padding: 20,
     borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop:200
    },
    btn:{
   backgroundColor: colors.fullTrans,
     width:45,
     height:45,
    position: "absolute",
    zIndex:999,
    },
    title: {
        color: colors.primary,
        fontWeight:'600',
        fontFamily: "Tajawal",
        fontSize: SIZES.h3,
        marginVertical: 5,
    },
    row: {
        flexWrap: 'wrap',
    },
    line: {
        backgroundColor: colors.lightGrey,
        height: 5,
        width:250,
        borderRadius:2,
        marginTop: -1,
        marginLeft:30,
        marginBottom:20
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        width:100
    },
    buttonTxt: {
        color: colors.white,
        fontWeight:'600',
        fontFamily: "Tajawal",
        fontSize: SIZES.h4,
    },
   
      dropdownContainer: {
        // marginBottom: 10,
      },
      dropdown: {
        // backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 40,
      },
      dropdownItem: {
        justifyContent: 'flex-start',
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderRadius: 40,
        fontSize:20,
        fontWeight:'bold',
        color:'red'
      },
      dropDownContainerStyle:{
        borderColor: colors.primary,
        borderWidth: 1,
        borderTopWidth: 0,
        borderRadius:30 , 
        padding:15
      },
      slider: {
        marginBottom: 16,
      },
      sliderValue: {
        fontSize: 16,
        fontWeight:'600',
        fontFamily: "Tajawal",
        color:colors.primary,
        textAlign: 'center',
        marginBottom:20
      },
      sliderContainer: {
          marginLeft:20,
          
        },
      item: {
        // marginVertical: 10,
    },
    subtitle: {
        color: colors.grey,
        fontWeight:'600',
        fontFamily: "Tajawal",
        fontSize: SIZES.h4,
    },
    category: {
        margin: 3,
        borderRadius: 15,
        borderWidth: 2,
        padding: 5,
        paddingHorizontal: 10,
    },
    text: {
        color: colors.title,
        fontSize: SIZES.h4,
    },
   
  };