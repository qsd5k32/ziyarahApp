// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { useTranslation } from 'react-i18next';

// const SavedScreen = () => {
//   const { t, i18n } = useTranslation();

//   const changeLanguageToArabic = () => {
//     i18n.changeLanguage('ar');
//   };
//   const changeLanguageToEnglish = () => {
//     i18n.changeLanguage('en');
//   };

//   return (
//     <View>
//       <Text style={{margin:20 , color:'green' , fontWeight:'bold' , fontSize:30}}>{t('WellcomeText')}</Text>
      
//       <View style={{flexDirection:'row' , justifyContent:'space-evenly' , margin:20}}>
//       <Button title="العربية" onPress={changeLanguageToArabic} style={{width:120}} />
//       <Button title="English" onPress={changeLanguageToEnglish} />

//       </View>
//     </View>
//   );
// };

// export default SavedScreen;
import React, { useContext } from 'react';
import { LanguageContext } from '../Context/context';
import { Text, Button , View, TouchableOpacity } from 'react-native';
import LanguageListener from '../Context/LanguageListener';
const SavedScreen = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <View>
            {/* <LanguageListener />

      <Text>Current language: {language}</Text>
      <TouchableOpacity onPress={() => handleLanguageChange('en')} >
        <Text>
        English
        </Text>
        
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => handleLanguageChange('fr')}>
      <Text>
      still under development
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SavedScreen;