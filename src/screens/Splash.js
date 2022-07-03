import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, StatusBar } from 'react-native';

import Logo from '../assets/presensi.png'
import Logo2 from '../assets/umrah.png'
import Logo3 from '../assets/kemendikbud.png'
import Logo4 from '../assets/satuGurindam.png'
import Background from '../assets/background.png'

function SplashScreen({ navigation }) {
    setTimeout(() => {
        navigation.replace('LoginScreen');
    }, 3000);
    return (
        <View style={styles.container}>
            {/* <StatusBar hidden={true} /> */}
            <ImageBackground
                source={Background}
                style={styles.background}
            >
                <Image
                    source={Logo2}
                    style={styles.logo}
                />
                <Image
                    source={Logo3}
                    style={styles.logo2}
                />
                <Image
                    source={Logo4}
                    style={styles.logo3}
                />
                <View style={styles.subContainer}>

                    <Image style={styles.image} source={Logo} />
                    <Text style={styles.text}>
                        PRESENSI
                        {'\n'}
                        UMRAH
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
        top: '35%',
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
    },
    image: {
        width: 110,
        height: 148,
        marginBottom: 20,
    },
    background: {
        width: '100%',
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    text: {
        color: '#FFF',
        fontSize: 34,
        fontFamily: 'Poppins-Bold',
        // fontWeight: 'bold',
        textAlign: 'center',
        color: '#DAC34D'
    },
    logo: {
        position: 'absolute',
        width: 45,
        height: 55,
        top: 0,
        right: 8
    },
    logo2: {
        position: 'absolute',
        width: 45,
        height: 45,
        top: 8,
        right: 60
    },
    logo3: {
        position: 'absolute',
        width: 117,
        height: 71,
        top: 28,
        right: -5
    }
})

export default SplashScreen;