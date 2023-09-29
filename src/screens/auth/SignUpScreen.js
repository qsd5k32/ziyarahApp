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
    <ImageBackground source={require("../../assets/imgs/madina.jpg")} style={styles.background} resizeMode="cover">
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

const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
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
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);
useEffect(()=>{
  if (language !== null) {
    i18n.changeLanguage(language); // Change language here
    console.log('languageeeeenew', language);
  }
}, [language]);
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName || !userEmail || !userPhone || !userPassword || !confirmPassword) {
      alert(t('fillAll'));
      return;
    }

    if (userPassword !== confirmPassword) {
      alert(t('PasswordsMatch'));
      return;
    }

    setLoading(true);

    var dataToSend = {
      name: userName,
      email: userEmail,
      phone: userPhone,
      password: userPassword,
      password_confirmation: confirmPassword,
    };

    fetch('https://ziyarh.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        console.log(responseJson);

        if (responseJson.status === 'success') {
          setIsRegistrationSuccess(true);
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setErrortext('An error occurred. Please try again later.');
      });
  };

  if (isRegistrationSuccess) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successText}>{t("Registration")}</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.successText}>{t('LoginNow')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const isArabic = language === 'ar';

  const flexDirectionStyle = isArabic ? 'row' : 'row-reverse';
  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>{t('createAccount')}</Text>
          <Field
            placeholder={t("Name")}
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
          <Field
            placeholder={t("Email")}
            keyboardType="email-address"
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
          />
          <Field
            placeholder={t("PhoneNumber")}
            keyboardType="phone-pad"
            value={userPhone}
            onChangeText={(text) => setUserPhone(text)}
          />
          <Field
            placeholder={t("Password")}
            secureTextEntry
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
          />
          <Field
            placeholder={t("ConfirmPassword")}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <CustomButton
            bgColor={colors.shadow}
            label={t("Signup")}
            onPress={handleSubmitButton}
          />
          {loading ? (
            <ActivityIndicator color={darkGreen} size="large" />
          ) : null}
          <View style={[styles.loginContainer , {flexDirection:flexDirectionStyle}]}>
            <Text style={styles.loginText}>{t("haveAccount")}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.loginLink}>{t("Login")}</Text>
            </TouchableOpacity>
          </View>
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
    color:colors.shadow,
    fontFamily: "Tajawal",
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    color: colors.shadow,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 10,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Tajawal",
    fontWeight: '600',
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
    color: white,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    fontFamily: "Tajawal",
    fontWeight: '600',
  },
  loginLink: {
    color: colors.shadow,
    fontFamily: "Tajawal",
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 20,
    fontFamily: "Tajawal",
    fontWeight: '600',
    color: colors.shadow,
    marginBottom: 20,
  },
});

export default SignUp;
