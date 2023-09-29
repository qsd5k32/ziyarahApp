import React, { useEffect ,useState , useContext} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text
  
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderHtml  from 'react-native-render-html';
import { ScrollView } from 'react-native';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FloatingButton from '../components/ModalTour';
import axios from 'axios';
import colors from '../assets/Colors';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import { useFonts } from 'expo-font';

  
const DetailsScreen = ({navigation, route}) => {
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
  const place = route.params;
  console.log("plaaaaaaaace", place)
  const [destinationData, setDestinationData] = useState(null);
  useEffect(() => {
    // Fetch data for the specific destination using Axios
    axios
    .get(`https://ziyarh.com/api/destination/${place.id}` , {
      headers: {
        'lang': language, 
      },
    })
    .then((response) => {
      const data = response.data.data;
      setDestinationData(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [place.id]);
  
  if (!destinationData) {
    return null;
  }
//   const evenning = destinationData.find((item) =>
//   item.title.includes('مسائية') || item.title.includes('Evening')
// );

// // Find the first item without "مسائية" or "Evening" in its name
// const morning = destinationData.find((item) =>
//   !item.title.includes('مسائية') || !item.title.includes('Evening')
// );

// console.log('Morning Tour:', morning);
// console.log('Evening Tour:', evenning);
const morrning = [];
const evening = [];

destinationData.three_tours.map((item) => {
  if (item.title.includes('مسائية') || item.title.includes('Evening')) {
    evening.push(item);
  } else {
    morrning.push(item);
  }
});

console.log('Morning Tour:', morrning);
console.log('Evening Tour:', evening);

const evenning = evening[0];
  const morning = morrning[0];


  // const evenning = destinationData.three_tours[0];
  // const morning = destinationData.three_tours[1];
console.log("distttt***" , destinationData.three_tours)
  console.log("placeeeeTour " + place.three_tours);
  const image = place.image;
  const thumbnail = {uri:place.thumbnail};
  const isArabic = language === 'ar';

  const flexDirectionStyle = isArabic ? 'row' : 'row-reverse';
  return (
      
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
     
     <StatusBar hidden={true} />
      <ScrollView contentContainerStyle={style.scrollViewContent}>
      <Image source={thumbnail ? thumbnail : image} style={style.backgroundImage} />
          <Icon
            name="arrow-back-ios"
            size={28}
            color={colors.white}
            onPress={navigation.goBack}
            style={{  
              position:'absolute' ,
             top:20 ,
             [language === 'ar' ? 'right' : 'left']: 20,
               backgroundColor: colors.bgLight , borderRadius:50 , 
               justifyContent:'center' ,
                alignItems:'center' ,
                paddingLeft:10  ,
                 paddingHorizontal:2 ,
                  paddingVertical:5 }}
          />
        <View style={style.header}>
          {/* <Icon name="more-vert" size={28} color={COLORS.white} /> */}
        </View>
      <View style={style.detailsContainer}>
        <View style={style.iconContainer}>
          <Icon name="favorite" color={colors.red} size={30} />
        </View>
        <View style={style.imageDetails}>
        </View>
          <Text
            style={{
              width: '100%',
              fontSize: 30,
              fontFamily: "Tajawal",
              fontWeight: '600',
              // color: COLORS.white,
              marginBottom: 10,
            }}>
            {place.name}
          </Text>
        <Text style={{marginTop: 20, fontFamily: "Tajawal",
    fontWeight: '600',fontSize: 20}}>
       { t('Discription')}
        </Text>
        <View style={style.descriptionContainer}>
        <RenderHtml
        source={{html: place.description}}
            tagsStyles={{
          p:{
            fontFamily: 'Tajawal',
            fontWeight: '600',
          },
        }}
      />
      </View>
      <Text style={{marginTop: 20, fontFamily: "Tajawal",
              fontWeight: '600',fontSize: 20}}>
      { t('Tour')}
        </Text>
        <View style={{marginLeft:5 , marginTop:3}}>

      <TouchableOpacity  onPress={() => {
            navigation.navigate('TourDetails', { id: morning.id });
          }} style={{ backgroundColor: colors.white , borderColor:colors.shadow, width:300 , margin:5 , padding:35, borderRadius:30 , borderWidth:1 ,flexDirection:flexDirectionStyle , justifyContent:"space-between" }}>
        <View style={{marginLeft:-20 ,  justifyContent:"center"  , alignItems:'center'}}>
      <Icon2 name="white-balance-sunny" size={30} color={colors.primary} />
        <Text style={{ fontFamily: "Tajawal",
              fontWeight: '600',}}> { t('Morning')}</Text>
        </View>
        <View style={{marginRight:10}}>
          <Text>
            <Text style={{ fontFamily: "Tajawal",
              fontWeight: '600',}}>{ t('starts')}:</Text> {morning.start} {"  "}
          <Text style={{ fontFamily: "Tajawal",
              fontWeight: '600',}}>{ t('ends')}:</Text> {morning.end} 
            </Text>
            <Text style={{marginTop:12 ,  fontFamily: "Tajawal",
              fontWeight: '600',}}>
              <Text style={{ fontFamily: "Tajawal",
              fontWeight: '600',}}>{ t('Duration')}: </Text>
             {morning.duration} { t('Hours')}
            </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity    onPress={() => {
            navigation.navigate('TourDetails', { id: evenning.id });
          }} style={{ backgroundColor: colors.green , width:300  , margin:5 , padding:30 ,borderRadius:30 , flexDirection:flexDirectionStyle , justifyContent:"space-between" }}>
        <View style={{marginLeft:-20 ,  justifyContent:"center"  , alignItems:'center'}}>
      <Icon2 name="weather-night" size={30} color={colors.white} />
        <Text style={{ fontFamily: "Tajawal",
              fontWeight: '600',}}> { t('Evening')}</Text>
        </View>
        <View style={{marginRight:10}}>
          <Text>
            <Text style={{ fontFamily: "Tajawal",
              fontWeight: '600',}}> { t('starts')}</Text> {evenning.start} {"  "}
            
          <Text style={{ fontFamily: "Tajawal",
              fontWeight: '600',}}> { t('ends')}</Text> {evenning.end} 
            </Text>
            <Text style={{marginTop:12 ,  fontFamily: "Tajawal",
              fontWeight: '600',}}>
              <Text style={{ fontFamily: "Tajawal",
              fontWeight: '600',}}>{ t('Duration')}: </Text>
             {evenning.duration} { t('Hours')}
            </Text>
        </View>
      </TouchableOpacity>
        </View>
      </View>
      {/* <View style={style.footer}>
       <FloatingButton tour={destinationData} />
      </View> */}
    </ScrollView>
    </SafeAreaView>
 
  );
};
const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 300,
    backgroundColor: colors.primary,
    color:colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary
  },

  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: -30,
    backgroundColor: colors.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    top: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    flex: 0.3,
    // elevation:4
  },
  header: {
    // marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position:'absolute'
  },
  footer: {
    flexDirection: 'row',
    // backgroundColor: colors.primary,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    marginTop:-10
  },
  descriptionContainer: {
    marginBottom: 3,
    
  },
  textDescription: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    // fontSize: sizes.descriptionSize,
    marginBottom: 8,
  },
  scrollViewContent: {
    // flexGrow: 1,
  },
  backgroundImage: {
    width:400,
    height:440
  },
});

export default DetailsScreen;