import React, { useEffect ,useState , useContext} from 'react';
import { View, Text, StyleSheet, ImageBackground , Dimensions , TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get("screen");
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



const FilterScheduleScreen = ({ route, navigation }) => {
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    if (language !== null && i18n.language !== language) {
      i18n.changeLanguage(language); // Change language here
      console.log('languageeeeenew', language);
    }
  }, [language]);
  const fetchSchedules = (id) => {
    console.log(id)
    axios
      .get(`https://ziyarh.com/api/schedules/${id}` , {
        headers : {
          'lang': language,
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
        // setSchedules(data.schedules);
        // setLoading(false);
        navigation.navigate('Test' , {data})
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching tour schedules:', error);
        setError('Error fetching tour schedules. Please try again later.');
        setLoading(false);
      });
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
  const { data } = route.params;
  console.log("Dest2" , data)
  console.log("DestId" , data[0].tourTime.id)
  
  const image = {uri :data[0].destination.thumbnail};
  return (
    <ScrollView>
       <View style={{padding:0 , flexDirection:'row' , flexWrap:'wrap'}}>
       {data.length > 0 ? (
        data.map((item, index) => (
          <View
             style={{margin:10}}>
            <ImageBackground style={styles.cardImage} source={{uri :data[index].destination.thumbnail}}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 20,
                  fontFamily: "Tajawal",
                  fontWeight: '600',
                  marginTop: 10,
                  textShadowColor: COLORS.primary,
                  textShadowOffset:{ width: 2, height: 2 },
                   textShadowRadius: 2,
                }}>
                {item.title}
              </Text>
              <View style={styles.line} />
            
              <View>
              <Text style={{
                color:COLORS.light , fontSize:15 , fontFamily: "Tajawal",
                fontWeight: '600',
               textShadowColor: COLORS.primary,
               textShadowOffset:{ width: 1, height: 1 },
                textShadowRadius: 2,
                }}>
                  {t('Time')}
                  </Text>
              <Text style={{color:COLORS.light , fontSize:11 ,  textShadowColor: COLORS.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2, fontFamily: "Tajawal",
    fontWeight: '600',}}>
             {item.tourTime.name} : {item.duration} {t('Hours')}
                </Text> 
                <Text style={{color:COLORS.light , fontSize:11 ,  textShadowColor: COLORS.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,fontFamily: "Tajawal",
    fontWeight: '600',}}>
             {t('From')} {item.start}
                </Text> 
                <Text style={{color:COLORS.light , fontSize:11 ,  textShadowColor: COLORS.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,fontFamily: "Tajawal",
    fontWeight: '600',}}>
             {t('To')} {item.end}
                </Text> 
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
            <TouchableOpacity style={{flexDirection:'row'}} 
             onPress={() => {fetchSchedules(item.id)}}>
             <Icon name="angle-right" size={18} color={COLORS.primary} style={{marginRight:5 , elevation:6}} />
             <Text style={styles.text}> {t('SeeSchedules')}</Text>
              </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
   ))
   ) : (
     <Text style={styles.noDataText}>{t('noData')}</Text>
   )}
        
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  card: {
    // backgroundColor: 'coral',
    borderRadius: 10,
    margin: 10,
  },
  line: {
    backgroundColor: COLORS.light,
    height: 1,
    marginVertical: 10,
    elevation:8
},
  cardImage: {
    height: 250,
    width: width / 2.3,
    // width: 420,
    // marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  text: {
    fontSize: 13,
    fontFamily: "Tajawal",
    fontWeight: '600',
    color: 'white',
    textShadowColor: COLORS.primary,
    textShadowOffset:{ width: 2, height: 2 },
     textShadowRadius: 2,
  },
  button:{

  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    margin: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default FilterScheduleScreen


