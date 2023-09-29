import React, { useEffect ,useState , useContext} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/SignUpScreen";
import WelcomeScreenOne from "../screens/welcomeScreens/WelcomeScreenOne";
import WelcomeScreenTwo from "../screens/welcomeScreens/WelcomeScreenTwo";
import WelcomeScreenThree from "../screens/welcomeScreens/WelcomeScreenThree";
import TabBar from "./TabNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FilterSchedule from "../screens/FilterResultScreen";
import SearchResults from "../screens/SearchResults";
import Details from "../screens/Details";
import TourSchedules from "../screens/TourSchedules";
import TourDetails from "../screens/TourDetails";
import TourBooking from "../screens/TourBooking";
import Test from "../screens/FilterScheduleScreen";
import EditProfileScreen from "../screens/EditProfile";
import EditInformation from "../screens/EditInformation";
import SettingsScreen from "../screens/profile/SettingsScreen";
import Luxury from "../screens/Distinations";
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import { t } from 'i18next';
import { I18nManager } from 'react-native';
import SettingsItemScreen from '../screens/profile/SettingsScreen';
import SettingsItem from '../screens/profile/SettingsItem';
const Stack = createStackNavigator();
const Auth = () => {
 
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator>
      {/* <Stack.Navigator initialRouteName="LoginScreen"> */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register", //Set Header Title
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {

  const { language } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (language !== null) {
      i18n.changeLanguage(language); 

      console.log('languageeew', language);
      
      if (language === 'ar') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
    }
  }, [language]);
  

useEffect(()=>{
  if (language !== null) {
    i18n.changeLanguage(language); // Change language here
    console.log('languageeeeenew', language);
  }
}, [language]);
  return (
    <Stack.Navigator>
                  {/* <Stack.Screen
        name="WelcomeScreenOne"
        component={WelcomeScreenOne}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomeScreenTwo"
        component={WelcomeScreenTwo}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="WelcomeScreenThree"
        component={WelcomeScreenThree}
        options={{ headerShown: false }}
      />
     <Stack.Screen  name="TabNavigator"
        component={TabBar}
        options={{ headerShown: false }}
        initialParams={{
          screens: [
            {
              name: "Home",
              component: require("../screens/HomeScreen").default,
              options: {
                // tabBarLabel: 'Home',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home"
                    size={size}
                    color={color}
                  />
                ),
              },
            },
          ],
        }}
      />
     <Stack.Screen name="TourBooking" component={TourBooking}   options={{   
     headerTitle: t('TourBook'),
    headerTitleStyle: {fontWeight:'600',
    fontFamily: "Tajawal",}, 
    }} />
     
 
       
  
      <Stack.Screen    name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
    
     <Stack.Screen name="filter" component={FilterSchedule}
     options={{   
      headerTitle: t('filter'),
     headerTitleStyle: {fontWeight:'600',
     fontFamily: "Tajawal",}, 
     }}
     />
     <Stack.Screen name="SearchResults" component={SearchResults} options={{   
      headerTitle: t('SearchResults'),
     headerTitleStyle: {fontWeight:'600',
     fontFamily: "Tajawal",}, 
     }} />
     <Stack.Screen name="Details"  options={{ headerShown: false }} component={Details}
    />
      <Stack.Screen name="TourSchedules"  options={{ headerShown: false }} component={TourSchedules} />
      <Stack.Screen name="TourDetails" options={{ headerShown: false }}  component={TourDetails} />
      <Stack.Screen name="Test" options={{ headerShown: false }} component={Test} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{   
     headerTitle: t('EditProfile'),
    headerTitleStyle: {fontWeight:'600',
    fontFamily: "Tajawal",}, 
    }} />
      <Stack.Screen name="EditInformation" component={EditInformation}  options={{   
     headerTitle: t('EditProfile'),
    headerTitleStyle: {fontWeight:'600',
    fontFamily: "Tajawal",}, 
    }}/>
      <Stack.Screen name="Dist" component={Luxury} options={{   
      headerTitle: t('Dist'),
     headerTitleStyle: {fontWeight:'600',
     fontFamily: "Tajawal",}, 
     }}/>
      {/* <Stack.Screen name="TripDetails" component={TripDetailsScreen} /> */}
      <Stack.Screen name="Settings" component={SettingsScreen} options={{   
      headerTitle: t('Settings'),
     headerTitleStyle: {fontWeight:'600',
     fontFamily: "Tajawal",}, 
     }} />
      <Stack.Screen name="SettingItem" component={SettingsItem} options={{   
      headerTitle: t('Language'),
     headerTitleStyle: {fontWeight:'600',
     fontFamily: "Tajawal",}, 
     }} />
      {/* <Stack.Screen name="SearchResults" component={SearchResults} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;