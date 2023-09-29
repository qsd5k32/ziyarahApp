import React, { useEffect ,useState , useContext} from 'react';
 
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../Context/context';
import { useFonts } from 'expo-font';
import RefreshComponent from '../components/Refresh';
import colors from '../assets/Colors';



const ProfileScreen = ({ navigation, route }) => {


  // Use this useEffect to trigger the API call every time the component is rendered
  useEffect(() => {
  

    userProfileInformation();
  }, [route]); 

  
  async function userProfileInformation() {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token !== null) {
        const response = await fetch('https://ziyarh.com/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'lang': language, // Make sure to get 'language' from your context or props
          },
        });

        const responseData = await response.json();

        if (response.ok) {
          setData(responseData);
          setIsLoading(false);
        } else {
          console.error('Profile User Error:', response.status, responseData);

          if (response.status === 401) {
            // Handle unauthorized error
          } else {
            // Handle other API errors
          }
        }
      }
    } catch (error) {
      console.error('Profile User Error:', error);
      // Handle network or unexpected error
    }
  }
 
  const handleProfileDataUpdate = (updatedData) => {
       updateProfileData(updatedData);
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
  
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);
useEffect(()=>{
  if (language !== null) {
    i18n.changeLanguage(language); // Change language here
    console.log('languageeeeenew', language);
  }
}, [language]);
const [accessToken, setAccessToken] = useState('');
const [Data, setData] = useState({});
const [isLoading, setIsLoading] = useState(true);
const [notifications, setNotifications] = useState(false);
  const [Lotifications, setLotifications] = useState(false);
  const [editedField, setEditedField] = useState('');
  const [editedValue, setEditedValue] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [country, setCountry] = useState(dataUser?.country_id || '');
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function userProfileInformation() {
      try {
        const token = await AsyncStorage.getItem('accessToken');
      if (token !== null) {
        setAccessToken(token);
        console.log(token);
  
        const response = await fetch('https://ziyarh.com/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'lang' : language
          },
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          setData(responseData);
            setIsLoading(false);
          console.log('Profile Userreeeerr Response:', Data.user);
   
        } else {
          console.error('Profile User Error:', response.status, responseData);
  
           if (response.status === 401) {
           } else {
           }
        }
      }
    } catch (error) {
      console.error('Profile User Error:', error);
      
      // Handle network or unexpected error
      // setError('Error fetching user profile. Please try again later.');
    }
  };
    userProfileInformation();
    
  }, []);
 
  const dataUser = Data.information;
  console.log("datauser", dataUser?.country_id); // Use optional chaining to avoid errors
  
  // Initialize country with an empty string if dataUser is undefined
  
  useEffect(() => {
    // Ensure dataUser and language exist before fetching items
    if (dataUser && language) {
      fetchDropdownItems();
    }
  }, [dataUser, language]);

  const fetchDropdownItems = async () => {
    try {
      const apiUrl = 'https://ziyarh.com/api/countries';
      const headers = new Headers();
      headers.append('lang', language);

      const response = await fetch(apiUrl, { headers });
      const responseData = await response.json();

      if (Array.isArray(responseData.data)) {
        const names = responseData.data.map((destination) => ({
          label: destination.name,
          value: destination.id,
        }));

        setItems(names);

        // Use optional chaining to check if dataUser and its properties exist
        const selectedCountry = dataUser?.country_id
          ? responseData.data.find((country) => country.id === dataUser.country_id)
          : null;

        // Check if a matching country was found
        if (selectedCountry) {
          const countryName = selectedCountry.name; // Adjust property name if needed
          setCountry(countryName);
        }
      } else {
        console.error('Response data is not an array:', responseData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  



console.log('country', country)

  
 

  

  const renderEditableField = (iconName, label, value) => (
    <View style={styles.infoRow}>
      <View style={styles.infoRowLeft}>
        <FeatherIcon name={iconName} size={20} color={colors.shadow} />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      {/* <TouchableOpacity onPress={() => {
  navigation.navigate('EditProfile', {
    userData: Data.user,
    // Pass the callback function
  });
}}>
        <FeatherIcon name="edit-3" size={20} color={colors.main} />
      </TouchableOpacity> */}
    </View>
  );
  const renderEditableInformation = (iconName, label, value) => (
    <View style={styles.infoRow}>
      <View style={styles.infoRowLeft}>
        <FeatherIcon name={iconName} size={20} color={colors.shadow} />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      {/* <TouchableOpacity    onPress={() => {
                navigation.navigate('EditInformation', { userData : Data.user });
              }}>
        <FeatherIcon name="edit-3" size={20} color={colors.main} />
      </TouchableOpacity> */}
    </View>
  );
  const isArabic = language === 'ar';

  const flexDirectionStyle = isArabic ? 'row' : 'row-reverse';



  const handleLogout = async () => {
    try {
       
      await AsyncStorage.removeItem('accessToken');
      console.error('Logout success' );
      
      navigation.navigate('Auth');  
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };
  const handleRefresh = () => {
    // Add a loading state or indicator if needed
    setIsLoading(true);
  
    // Call the userProfileInformation function to fetch user data again
    userProfileInformation();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
     
        <View style={[styles.profileContainer]}>
          <View style={styles.profilePictureContainer}>
            <Image
              source={require('../assets/imgs/user.png')}
              // source={require(`${Data.user.avatar}`)}
              // source={{uri: Data.user.avatar}}
              style={styles.profilePicture}
            />
            {/* <AntDesignIcon
              name="camerao"
              size={20}
              color="#fff"
              style={styles.cameraIcon}
            /> */}
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.shadow} />
          ) : (
            <>
            <Text style={styles.profileName}>
              {Data.user && Data.user.name ? Data.user.name : ''}
            </Text>
          {/* <Text style={styles.profileLocation}>New York, USA</Text> */}
          </>
          )}
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
    <FontAwesomeIcon name="refresh" size={24} color="green" />
  </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          {renderEditableField('mail', Data.user && Data.user.email ? Data.user.email : '')}
          {renderEditableField('phone',Data.user && Data.user.phone ? Data.user.phone : '')}
          {renderEditableField('user',Data.user && Data.user.name ? Data.user.name : '')}
          <TouchableOpacity onPress={() => {
  navigation.navigate('EditProfile', {
    userData: Data.user,
    // Pass the callback function
  });

}} style={{}}>
        <FeatherIcon name="edit" size={20} color={colors.main} />
      </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>

          {renderEditableInformation('globe', country && country ? country : '')}
          {renderEditableInformation('globe', Data.user && Data.information.city ? Data.information.city : '')}
          {renderEditableInformation('map-pin', Data.user && Data.information.address ? Data.information.address : '')}
          <TouchableOpacity    onPress={() => {
                navigation.navigate('EditInformation', { userData : Data.user });
              }}>
        <FeatherIcon name="edit" size={20} color={colors.main} />
      </TouchableOpacity>
        </View>

        {/* <View style={styles.section}>
  <View style={[styles.switchContainer, { flexDirection: flexDirectionStyle }]}>
    <FeatherIcon name="bell" size={20} color="#0c0c0c" />
    <Text style={styles.switchLabel}>{t('EnableNotifications')}</Text>
    <Switch value={notifications} onValueChange={setNotifications} />
  </View>
</View>


        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('Location')}</Text>
          <View style={[styles.switchContainer , {flexDirection: flexDirectionStyle}]}>
            <Switch value={Lotifications} onValueChange={setLotifications} />
            <View style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Text style={styles.switchLabel}>{t('EnableLocation')}</Text>
            <FeatherIcon name="map-pin" size={20} color="#0c0c0c" />
          </View>
          </View>
        </View> */}
        <TouchableOpacity style={styles.section}  onPress={userProfileInformation}>
          <Text style={styles.sectionHeader}>{t('ReportProblem')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section}>
          <Text style={styles.sectionHeader}>{t('TermsUse')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section}>
          <Text style={styles.sectionHeader}>{t('HelpCenter')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section}>
          <Text style={styles.sectionHeader}>{t('DeleteAccount')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.sectionHeader}>{t('Settings')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={handleLogout}>
          <Text style={styles.sectionHeader}>{t('LogOut')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section}>
          <Text style={styles.sectionHeader}>{t('')}</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{t('Edit')}:</Text>
            <TextInput
              style={styles.modalInput}
              value={editedValue}
              onChangeText={(text) => setEditedValue(text)}
              defaultValue={editedField}
            />
            
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.white2,
    borderRadius: 10,
    padding: 2,
  },
  profileName: {
    fontSize: 24,
    fontFamily: "Tajawal",
    fontWeight: '600',
    color: 'green',
    marginBottom: 5,
  },
  profileLocation: {
    fontSize: 16,
    color: colors.white2,
  },
  infoContainer: {
    backgroundColor: colors.white2,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    marginLeft: 15,
    width:'90%'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    marginLeft: 10,
     fontWeight:'600',
    fontFamily: "Tajawal",
  },
  section: {
    justifyContent: 'space-between',
    backgroundColor: colors.white2,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: "Tajawal",
    fontWeight: '600',
    color: colors.main,
  },
  switchContainer: {
    flexDirection: 'row-reverse', // Change flexDirection to 'row'
    alignItems: 'center',
    justifyContent: 'space-between', // Add justifyContent to space between text and switch
    marginTop: 10,
  },
  switchLabel: {
    marginRight: 10, // Add marginRight for space between text and switch
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgTrans,
  },
  modalContent: {
    backgroundColor: colors.white2,
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007bff',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  refreshButton: {
    // position: 'absolute',
    // top: 10, // Adjust the top position as needed
    // right: 10, // Adjust the right position as needed
    zIndex: 1, // Ensure it's above other content
  },
});

export default ProfileScreen;