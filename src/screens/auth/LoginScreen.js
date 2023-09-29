import React, { useEffect ,useState , useContext} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../Context/context';
import { useFonts } from 'expo-font';
import colors from '../../assets/Colors';
const darkGreen = '#006A42';
const white = '#FFFFFF';
const gray = '#808080';

const Background = ({ children }) => {
  return (
    <ImageBackground source={require("../../assets/imgs/makka3.jpg")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const CustomButton = ({ bgColor = darkGreen, textColor = white, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: bgColor }]}>
    <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
  </TouchableOpacity>
);

const Field = ({ placeholder, keyboardType = 'default', secureTextEntry = false, ...props }) => (
  <TextInput
    {...props}
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor={darkGreen}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
  />
);


const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [lang, setLang] = useState('');
  const isArabic = language === 'ar';

  const flexDirectionStyle = isArabic ? 'row' : 'row-reverse';
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);
useEffect(()=>{
  if (language !== null) {
    i18n.changeLanguage(language); // Change language here
    console.log('languageeeeenew', language);
  }
}, [language]);
let [fontsLoaded] = useFonts({
  Montserrat: require('../../assets/fonts/Montserrat.ttf'),
  ElMessiri: require('../../assets/fonts/ElMessiri.ttf'),
  Cairo: require('../../assets/fonts/Cairo.ttf'),
  Tajawal: require('../../assets/fonts/Tajawal.ttf'),
});

useEffect(() => {
  // Your font loading code here
  if (!fontsLoaded) {
    // Handle font loading error here
  }
}, [fontsLoaded]);
  // const changeLanguageToArabic = () => {

  //   i18n.changeLanguage('ar');
  // };
  const handleLogin = () => {
    // Perform your login logic here
    alert("Logged In");
  };


  const handleSignupNavigation = () => {
    console.log("first")
    navigation.navigate("RegisterScreen");
  };
  const handleGuest = () => {
      const removeTokenFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      console.log('Token removed successfully');
    } catch (error) {
      console.log('Error removing token:', error);
    }
  };
  removeTokenFromStorage();
    navigation.navigate("TabNavigator");
  };

  
  const handleSubmitPress = () => {
    setLoading(true);
    setErrortext('');
  
    if (!userEmail) {
      setLoading(false);
      setErrortext(t('fillEmail'));
      return;
    }
    if (!userPassword) {
      setLoading(false);
      setErrortext(t('fillPassword'));
      return;
    }
  
    let dataToSend = {
      email: userEmail,
      password: userPassword,
      client_id: 2,
      client_secret: 'K6Vrs6deHbwsN1Bvo2MDU00aLWIP2E4Il8Y0fCIc',
      grant_type: 'password',
      scope: '*',
    };
  
    fetch('https://ziyarh.com/api/login', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json',
        'lang': language,
      },
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        setLoading(false);
        console.log(responseJson); // Log the response to the console
  
        if (responseJson.status === true) {
          try {
            await AsyncStorage.setItem('accessToken', responseJson.access_token);
            navigation.navigate('TabNavigator'); // Navigate to the Home screen after successful login
          } catch (error) {
            console.error('Error saving token:', error);
            setErrortext(t('saveTokenError'));
          }
        } else {
          setErrortext(t('invalidCredentials')); // Display an error message for invalid credentials
        console.error(responseJson);

        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setErrortext(t('networkError')); // Display a network error message
      });
  };
  

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>{t('WellcomeBack')}</Text>
          <Text style={styles.description}>{t('LoginAccount')}</Text>
          <Field
            placeholder={t("Email")}
            keyboardType="email-address"
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
          />
          <Field
            placeholder={t("Password")}
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
            secureTextEntry
            style={{
              textAlign: isArabic ? 'left' : 'right',
              textAlignVertical: 'center',
            }}
          />
  
          <CustomButton
            bgColor={colors.shadow}
            label={t('Login')}
            onPress={handleSubmitPress}
          />
          {loading ? (
            <ActivityIndicator color={darkGreen} size="large" />
          ) : (
            // Display the error text when it's not an empty string
            errortext !== '' && (
              <Text style={styles.errorText}>{errortext}</Text>
            )
          )}
          <View style={[styles.signupContainer , {flexDirection: language === 'ar' ? 'row' : 'row-reverse'}]}>
            <Text style={styles.signupText}>{t('noAccount')}</Text>
            <TouchableOpacity onPress={() => { navigation.navigate("RegisterScreen"); }}>
              <Text style={styles.signupLink}>{t('Signup')}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleGuest}>
            <Text style={styles.forgotPassword}>{t('Guest')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Background>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  subtitle: {
    fontSize: 20,
    color: colors.shadow,
    fontFamily: "Tajawal",
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    // color: black,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  input: {
    borderRadius: 10,
    color: colors.shadow,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginVertical: 10,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex',  
    paddingBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.shadow,  
    borderWidth: 1,  
    borderRadius: 10,  
    padding: 5, 
  },
  
  forgotPassword: {
    color: colors.shadow,
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: 18,
     marginTop: 10,
  },
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  signupLink: {
    color: colors.shadow,
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  errorText: {
    color: 'red',  
    fontSize: 16,
    fontFamily: "Tajawal",  
    fontWeight: '600',
    marginTop: 10,
  },
  
});

export default Login;
