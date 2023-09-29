import React, { useEffect ,useState , useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import Dist from '../screens/Distinations';
import MyTrips from '../screens/MyTrips';
import ProfileScreen from '../screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);
useEffect(()=>{
  if (language !== null) {
    i18n.changeLanguage(language); // Change language here
    console.log('languageeeeenew', language);
  }
}, [language]);
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

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#007A00',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#F8F8F8',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 20,
          right: 20,
          left: 20,
          borderRadius: 330,
          elevation: 10,
          height: 70,
        },
        tabBarLabelStyle: {
          display: 'none', // تعديل هنا لإخفاء النصوص
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === t('Home')) {
            iconName = 'home';
          } else if (route.name === t('MyTrips')) {
            iconName = 'briefcase';
          } else if (route.name === t('Dist')) {
            iconName = 'map-marker';
          } else if (route.name === t('Saved')) {
            iconName = 'bookmark';
          } else if (route.name === t('Account')) {
            iconName = 'account';
          }

          return (
            <View style={{ marginBottom: 8, alignItems: 'center' }}>
              <MaterialCommunityIcons
                name={iconName}
                size={22}
                color={focused ? '#007A00' : '#8E8E93'}
              />
              {focused && (
                <Text style={{ color: '#007A00', fontSize: 12 ,fontWeight:'600',
                fontFamily: "Tajawal", }}>{route.name}</Text>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name={t('Home')} component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name={t('Dist')} component={Dist} options={{ headerShown: false }} />
      {accessToken !== '' ? (
        <>
        <Tab.Screen name={t('Saved')} component={SavedScreen} options={{ headerShown: false }} />
          <Tab.Screen name={t('MyTrips')} component={MyTrips} options={{ headerTitle: t('MyTrips') , 
          headerTitleStyle: {
            fontSize: 25, 
            fontWeight:'600',
            fontFamily: "Tajawal",
          }, }} />
          <Tab.Screen name={t('Account')} component={ProfileScreen} options={{ headerShown: false ,
        
          }} />
        </>
      ) : null}
    </Tab.Navigator>
  );
};

export default TabNavigator;