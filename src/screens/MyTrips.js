import React, { useEffect ,useState , useContext} from 'react';
import { View, Text, StyleSheet, ImageBackground , Dimensions , TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import {useFonts ,  Cairo } from '@expo-google-fonts/cairo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get("screen");
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import { useFonts } from 'expo-font';
import colors from '../assets/Colors';


const MyTrips = ({navigation}) => {
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);

useEffect(()=>{
  if (language !== null) {
    i18n.changeLanguage(language); // Change language here
    console.log('languageeeeenew', language);
  }
 
}, [language]);
  const [accessToken, setAccessToken] = useState('');
  const [tripsData, setTripsData] = useState([]);
  
 
  const userTripsInformation = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token !== null) {
        setAccessToken(token);
        console.log(token);
  
        const response = await fetch('https://ziyarh.com/api/profile/trips', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json, text/plain, /',
            'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8,fr;q=0.7,es;q=0.6',
            Cookie: 'auth.strategy=local; splash=true; welcome=1; auth._token.local=Bearer YOUR_ACCESS_TOKEN; auth._token_expiration.local=1720441914151.843; lang=en',
            Origin: 'https://ziyarh.com',
            Referer: 'https://ziyarh.com/profile/trips',
            'Sec-Ch-UA': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
            'Sec-Ch-UA-Mobile': '?1',
            'Sec-Ch-UA-Platform': 'Android',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
            'lang' : language
          },
        });
  
        const responseData = await response.json(); // Parse response as JSON
  
        if (response) {
          console.log('MyTrips Response:', responseData.data);
          // Optionally, you can update the profileData state with the new data
          setTripsData(responseData.data);
        } else {
          console.error('MyTrips Error:', response.status, responseData);
        }
      }
    } catch (error) {
      console.error('MyTrips Error:', error);
    }
  };
  useEffect(() => {
    userTripsInformation();
   
  }, []);
  console.log('tourIDinfo:' ,  tripsData.tour)

 
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
  
  // const image = require('../assets/imgs/onboardImage.jpg');
  return (
    <ScrollView>

    <View style={{padding:0 , flexDirection:'row' , flexWrap:'wrap'}}>
    {tripsData.length > 0 ? (
        tripsData.map((item, index) => (
          <View
             style={{margin:10}}>
            <ImageBackground style={styles.cardImage} source={{uri : item.destination.thumbnail}}  blurRadius={10}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 20,
                  // fontWeight: 'bold',
                  marginTop: 10,
                  fontFamily: "Tajawal",
                  fontWeight: '600',
                }}>
                {item.tour.title}
                {console.log('tourID:' ,  item.tour.id)}
              </Text>
              <View style={styles.line} />
              <Text style={{color:colors.grey , fontSize:11 , fontFamily: "Tajawal"}}>{item.start_date}</Text>
                  <TouchableOpacity style={{marginTop:15 , backgroundColor:colors.primary , borderRadius:50 , padding:5 , width:80 , marginLeft:55}}>
                 <Text style={{fontSize:12 , fontWeight:'600'  ,color: colors.light ,  fontFamily: "Tajawal" }}>{ t('SeeReceipt')}</Text>
                  </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity 
                 onPress={() => navigation.navigate('TourDetails', {id: item.tour.id})}
                style={{flexDirection:'row'}}>
             <Icon name="angle-right" size={18} color={colors.light} style={{marginRight:5}} />
             <Text style={styles.text}>{ t('ViewDetails')}</Text>
              </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
         ))
         ) : (
           <Text style={styles.noDataText}>{ t('noData')}</Text>
         )}
    </View>
    </ScrollView>
  )
}

export default MyTrips;

const styles = StyleSheet.create({
  card: {
    // backgroundColor: 'coral',
    borderRadius: 10,
    margin: 10,
  },
  line: {
    backgroundColor: colors.light,
    height: 1,
    marginVertical: 10,
},
  cardImage: {
    height: 220,
    width: width / 2.3,
    // width: 420,
    // marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    
  },
  text: {
    fontSize: 13,
    // fontWeight: 'bold',
    color: colors.white,
    fontFamily: "Tajawal",
     fontWeight: '600',
  },
  button:{

  },
  subtitle: {
    fontSize: 14,
    color: colors.white,
    margin: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
