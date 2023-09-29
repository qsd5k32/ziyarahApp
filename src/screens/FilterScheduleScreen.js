import React, { useEffect ,useState , useContext} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator , ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Icon from '@expo/vector-icons/FontAwesome5';
import IconArrow from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import colors from '../assets/Colors';
import HTML from 'react-native-render-html';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const COLORS = {
  white: '#FFF',
  dark: '#000',
  primary: '#007A00',
  secondary: '#e1e8e9',
  light: '#f9f9f9',
  grey: '#dddedd',
  red: 'red',
  orange: '#f5a623',
};
const Test = ({ route, navigation }) => {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    async function getTokenFromStorage() {
      const token = await AsyncStorage.getItem('accessToken');
      if (token !== null) {
        setAccessToken(token);
        console.log(token);
      }
    }
    getTokenFromStorage();
  }, []);
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
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedules(route.params.data);
  }, [route.params.data]);
console.log("tour id" ,  route.params.data)
  const fetchSchedules = (id) => {
    axios
      .get(`https://ziyarh.com/api/schedules/2` , {
        headers: {
          'lang' : language
        }
      })
      .then((response) => {
        console.log('API response:', response.data.data.schedules);
        if (!response) {
          throw new Error('Network response was not ok');
        }
        return response.data.data;
      })
      .then((data) => {
        setSchedules(data.schedules);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tour schedules:', error);
        setError('Error fetching tour schedules. Please try again later.');
        setLoading(false);
      });
  };
  

  const handleBookNow = (id) => {
    if (accessToken === '') {
      navigation.navigate('Auth');
    } else {
      navigation.navigate('TourBooking', { scheduleId: id });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.loadingText}>{t('Loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const { data } = route.params;

  const renderImg = (passengerName) => {
    if (passengerName === 'child') {
      return <Image source={require('../assets/imgs/boy.png')} style={styles.passengerImg} />;
    } else if (passengerName === 'adult') {
      return <Image source={require('../assets/imgs/adult.png')} style={styles.passengerImg} />;
    } else if (passengerName === 'baby') {
      return <Image source={require('../assets/imgs/baby-boy.png')} style={styles.passengerImg} />;
    } else if (passengerName === 'elder') {
    return <Image source={require('../assets/imgs/old-man.png')} style={styles.passengerImg} />;
  }
  }
  const renderPassengerTypeItem2 = ({ item }) => (
    <View style={styles.passengerTypeItem}>
      {renderImg(item.name)}
      <Text style={{color:colors.shadow}}>{item.name}</Text>
      <View style={{flexDirection :flexDirectionStyle}}>
        <FontAwesome name="money" size={17} color="green" style={{[language === 'ar' ? 'marginRight' : 'marginLeft']: 5,}}  />
      <Text style={{fontFamily: "Tajawal",
    fontWeight: '600',}}>
         {item.price} { t('SR')}
      </Text>

      </View>
    </View>
  );

  const renderTwoColumns = ({ item }) => (
    <View style={styles.twoColumnContainer}>
      <View style={styles.column}>
        {item[0] && renderPassengerTypeItem2({ item: item[0] })}
      </View>
      <View style={styles.column}>
        {item[1] && renderPassengerTypeItem2({ item: item[1] })}
      </View>
    </View>
  );
  
  const passengerTypes = data.passengerTypes;
  const twoColumnData = [];
  for (let i = 0; i < 5; i += 2) {
    const row = [];
    row.push(passengerTypes[i]);
    if (i + 1 < 5) {
      row.push(passengerTypes[i + 1]);
    }
    twoColumnData.push(row);
  }
  const isArabic = language === 'ar';

  const flexDirectionStyle = isArabic ? 'row' : 'row-reverse';
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <BackgroundImage source={{ uri: data.destination?.images[0] }} style={styles.image} >
          <IconArrow
    name="arrow-back-ios"
    size={28}
    color={colors.white}
    onPress={() => navigation.goBack()}
    style={{
      position: 'absolute',
      top: 15,
      [language === 'ar' ? 'right' : 'left']: 20,
      zIndex: 2, 
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
      paddingHorizontal: 2,
      paddingVertical: 5,
    }}
  />
          <Text style={[styles.title , {[language === 'ar' ? 'marginRight' : 'marginLeft']: 20}]}>{data.title}</Text>
          </BackgroundImage>
          {/* <View style={styles.description}>
          <HTML source={{ html: data.destination?.description }} />
          </View> */}
          <View style={styles.description}>

          <View style={{flexDirection :flexDirectionStyle}}>
            <FontAwesome name="money" size={25} color="green" style={{[language === 'ar' ? 'marginRight' : 'marginLeft']: 10,}}  />
          <Text style={[styles.price ]}>
             {data.price} {''}
            { t('SR')}
          </Text>
          </View>
          <View style={{flexDirection :flexDirectionStyle}}>

            <FontAwesome name="clock-o" size={25} color="black" style={{[language === 'ar' ? 'marginRight' : 'marginLeft']: 10,}} />
          <Text style={styles.duration}>
             {data.duration} { t('days')}
          </Text>
          </View>
          </View>
    
          <View style={styles.passengerTypesContainer2}>
      <Text style={styles.passengerTypesTitle2}>{ t('PassengerTypes')}:</Text>
      <FlatList
        data={twoColumnData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTwoColumns}
      />
    </View>
          <View style={styles.schedulesContainer}>
            <Text style={styles.schedulesTitle}>{ t('TourSchedules')}:</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {schedules.length === 0 ? (
              <Text style={styles.noSchedulesText}>{ t('schedulesAvailable')}.</Text>
            ) : (
              
              schedules.map((item) => (
                <View key={item.id} style={styles.scheduleCard}>
                  <TouchableOpacity style={styles.scheduleItem}>
                    <View style={styles.scheduleInfo}>
                      <View style={{flexDirection :flexDirectionStyle}}>

                        <FontAwesome name="calendar" size={16} color="gray" style={{[language === 'ar' ? 'marginRight' : 'marginLeft']: 10,}}  /> 
                      <Text style={styles.scheduleDate}>
                      {item.human_start || 'Date N/A'}
                      </Text>
                      </View>
                      <View style={{flexDirection :flexDirectionStyle}}>
                        <FontAwesome name="users" size={16} color="gray" style={{[language === 'ar' ? 'marginRight' : 'marginLeft']: 10,}} /> 
                      <Text style={styles.schedulePrice}>
                        {item.places ? `${item.places} ${ t('Places')}` : t('NoPlaces')}
                      </Text>

                      </View>
                      <View style={{flexDirection :flexDirectionStyle}}>
                      <FontAwesome name="money" size={16} color="green" style={{[language === 'ar' ? 'marginRight' : 'marginLeft']: 10,}}  /> 
                      <Text style={styles.schedulePrice}>
                       {item.price ? `${item.price} ${t('SR')}` : 'Price N/A'}
                      </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.bookButton} onPress={() => handleBookNow(item.id)}>
                      <Text style={styles.bookButtonText}>{ t('BookNow')}</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
                
              ))
            )}
            </ScrollView>
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor:"white"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: "Tajawal",
    fontWeight: '600',
    marginBottom: 16,
    marginLeft: 20,
    color:colors.white,
    marginTop: 16,
    textShadowColor: COLORS.primary,
    textShadowOffset:{ width: 2, height: 2 },
     textShadowRadius: 2,
  },
  // scheduleItem: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   borderBottomWidth: 1,
  //   borderColor: 'gray',
  //   paddingVertical: 12,
  // },


  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 16,
    
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    margin: 16,
    padding:20,
    backgroundColor:colors.third,
    elevation:3,
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 8,
    // padding:20
   
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  duration: {
    fontSize: 20,
    marginBottom: 8,
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  // passengerTypesContainer: {
  //   marginBottom: 16,
  // },
  // passengerTypesTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 8,
  // },
  // passengerTypeItem: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: 8,
  // },
  schedulesContainer: {
    marginBottom: 16,
    justifyContent:'center'
  },
  schedulesTitle: {
    fontSize: 18,
    fontFamily: "Tajawal",
    fontWeight: '600',
    marginBottom: 8,
    padding:8,
    color:colors.shadow
  },
  bookButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
  bookButtonText: {
    color: 'white',
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  noSchedulesText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: "Tajawal",
    fontWeight: '600',
    marginTop: 8,
    marginRight:50,
    padding:30,
    backgroundColor:colors.third,
    borderRadius:30
  },
  scheduleCard: {
    width: 200, 
    margin:20
  },
  scheduleItem: {
    backgroundColor: colors.third,
    borderRadius: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150, 
    elevation:5
  },
  scheduleInfo: {
    marginBottom: 10,
    marginTop: 10,

  },
  scheduleDate: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  schedulePrice: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: colors.shadow,
    padding: 11,
    borderRadius: 50,
  },
  // bookButtonText: {
  //   color: 'white',
  //   fontWeight: '500',
  // },
  //////////////////
  passengerTypesContainer2: {
    marginVertical: 10,
    padding:8
  },
  passengerTypesTitle2: {
    fontSize: 18,
    fontFamily: "Tajawal",
    fontWeight: '600',
    marginBottom: 25,
    color:colors.shadow
  },
  passengerTypesContainer: {
    marginVertical: 10,
  },
  passengerTypesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  twoColumnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  column: {
    // flex: 1,
    marginRight: 10,
  },
  passengerTypeItem: {
    backgroundColor: 'white',
    borderColor:colors.green,
    borderWidth:2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical:10,
    justifyContent: 'center',
    alignItems: 'center',
    
    // height: 150, 
  },
 
  passengerImg:{
    width:40,
    height:40
  }
});

export default Test;
