import React, { useEffect ,useState , useContext} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../assets/Colors';
import sizes from '../assets/Sizes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import { useNavigation } from '@react-navigation/native';

const Card = (props) => {
  // const [loaded] = useFonts({
  //   Montserrat: require('../assets/fonts/Montserrat.ttf'),
  // });
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
const isArabic = language === 'ar';

  const flexDirectionStyle = isArabic ? 'row' : 'row-reverse';
  const [cardData, setCardData] = useState([]);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = windowWidth - 50; // Subtracting the horizontal padding

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.cardContainer, { width: cardWidth }]}>
        <BackgroundImage source={ {uri: props.image}} style={styles.image} >
        <View style={styles.textAlign}>
          <Text style={styles.textHeader}>{props.header}</Text>
       
        </View>

        </BackgroundImage>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reviews: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.buttonTextSmall,
    color: colors.secondary,
    marginHorizontal: 4,
  },
  result: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.paragraphSizeSmaller,
    marginHorizontal: 4,
  },
  infoAlign: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 12,
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: sizes.menuText,
  },
  textAlign: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 9,
    marginBottom: 7,
    marginHorizontal: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  cardContainer: {
    height: 230,
    borderRadius: 20,
    backgroundColor: colors.white,
    elevation: 5,
    marginHorizontal: 10,
    marginBottom: 20,
    overflow: 'hidden',
    // alignItems: 'center',
  },
});

export default Card;
