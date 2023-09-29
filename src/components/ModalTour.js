import React, { useState , useEffect , useCallback , useRef } from 'react'
import axios from 'axios'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/Colors';

const ModalTime = ({ navigation , morning , evenning , setModalVisible , modalVisible  }) => {


  const handleModalClose = () => {
    setModalVisible(false)
  }
  return (
    <Modal
    visible={modalVisible}
    animationType="slide"
    statusBarTranslucent={true}
    onRequestClose={handleModalClose}
    transparent={true} 
    >
    <View style={styles.modal}>
      <View style={styles.modalContent}>
      <View style={styles.descriptionContainer}>
        <View style={{flexDirection:'row' , justifyContent:'space-between' , width:"100%" , height:50}} >

      <Icon name="window-close" size={30} color={COLORS.primary}  onPress={handleModalClose} />
      <Text style={{ fontWeight: 'bold', fontSize: 20}}>
    Tour
    </Text>
        </View>

      <TouchableOpacity  onPress={() => {
            navigation.navigate('TourDetails', { id: morning.id });
          }} style={{ backgroundColor: colors.light , borderColor:colors.shadow, width:270 , height:100 , margin:5 , padding:20, borderRadius:30 , borderWidth:1 ,flexDirection:'row-reverse' , justifyContent:"space-between" }}>
        <View>
      <Icon name="white-balance-sunny" size={30} color={COLORS.primary} />
        <Text style={{fontWeight:'bold'}}>Morning</Text>
        </View>
        <View style={{marginRight:10}}>
          <Text>
            <Text style={{fontWeight:'600'}}>Starts:</Text> {morning.start} {"  "}
          <Text style={{fontWeight:'600'}}>Ends:</Text> {morning.end} 
            </Text>
            <Text style={{marginTop:12}}>
              <Text style={{fontWeight:'600'}}>Duration: </Text>
             {morning.duration} Hours
            </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity    onPress={() => {
            navigation.navigate('TourDetails', { id: evenning.id });
          }} style={{ backgroundColor: colors.green , width:270 , height:100 , margin:5 , padding:20 ,borderRadius:30 , flexDirection:'row-reverse' , justifyContent:"space-between" }}>
        <View>
      <Icon name="weather-night" size={30} color={COLORS.white} />
        <Text style={{fontWeight:'bold'}}>Evenning</Text>
        </View>
        <View style={{marginRight:10}}>
          <Text>
            <Text style={{fontWeight:'600'}}>Starts:</Text> {evenning.start} {"  "}
          <Text style={{fontWeight:'600'}}>Ends:</Text> {evenning.end} 
            </Text>
            <Text style={{marginTop:12}}>
              <Text style={{fontWeight:'600'}}>Duration: </Text>
             {evenning.duration} Hours
            </Text>
        </View>
      </TouchableOpacity>
</View>
      </View>
    </View>
  </Modal>
  );
};
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


const FloatingButton = ({tour}) => {
  const evenning = tour.three_tours[0];
  const morning = tour.three_tours[1];
  console.log("morning***** " + morning.title);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false)

  // const handleButtonClick = () => {
  //   setModalVisible(true)
  // }
  const modalVisibleRef = useRef(modalVisible);
  modalVisibleRef.current = modalVisible;
  const handleButtonClick = useCallback(() => {
    console.log("Button clicked");
    setModalVisible(true);
  }, []);
  const handleModalClose = () => {
    setModalVisible(false)
  }
      return (
        <View>
<TouchableOpacity style={styles.bookNowBtn}  onPress={handleButtonClick}>
 <Text  style={{color: COLORS.white, fontSize: 16, fontWeight: 'bold'}}>Book Now</Text>
</TouchableOpacity>
      <ModalTime morning={morning} evenning={evenning} modalVisible={modalVisible} setModalVisible={setModalVisible}  navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // height: 40,
    width: 400,
    // padding: 20,
    marginLeft: -20,
  },
  modalContent: {
    width: '80%',
    height: 350,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#041585',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  bookNowBtn: {
    height: 50,
    width: 300,
    backgroundColor: COLORS.primary,
    color:COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary
  },
  descriptionContainer: {
    marginBottom: 3,
  },
})

export default FloatingButton
