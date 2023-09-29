import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import colors from '../../assets/Colors';
import sizes from '../../assets/Sizes';
import { useFonts } from 'expo-font';
import Button from '../../components/Button';
import Lines from '../../components/Lines';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreenOne = (props) => {
    const navigation = useNavigation();
    const [loaded] = useFonts({
        Montserrat: require('../../assets/fonts/Montserrat.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.pictureContainer}>
                <Image style={styles.picture} source={require('../../assets/imgs/splash11.jpg')} />
            </View>

            <Text style={styles.textMain}>Explore a New World</Text>
            <Text style={styles.textSecondary}>Find place for travel, camping, hiking. Relax and enjoy your trip!</Text>

            <Lines colorOne={colors.green} colorTwo={colors.green} numLines={1} />

            <Button name="Next" onPress={() => navigation.navigate('WelcomeScreenTwo')} />
            <Text style={{ textAlign:'center' , marginBottom:5 , fontSize:15}}>V-11.0</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    textMain: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: sizes.headerSize,
        color: colors.main,
        alignSelf: 'center',
        marginBottom: 18,
        textShadowColor: colors.white,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    },
    textSecondary: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: sizes.paragraphSize,
        color: colors.secondary,
        textAlign: 'center',
        marginHorizontal: 45,
        marginBottom: 45,
    },
    pictureContainer: {
        position: 'absolute',
        top: 24,
        width: '100%',
        justifyContent: 'center',
    },
    picture: {
        width: '100%',
        height: 500,
    },
});

export default WelcomeScreenOne;
