import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import Img from '../assets/berhasil.png'
import img2 from '../assets/failed.png'

const PresensiBerhasil = (props) => {
    const navigation = useNavigation();
    const pulang = useSelector((state) => state.pulang);
    console.log('daatang', pulang);

    setTimeout(() => {
        props.setBerhasilVisible2(false)
        navigation.navigate("HomepageScreen")
    }, 2500);
    return (
        <View style={styles.container}>
            {pulang.error ?
                <View style={styles.error}>
                    <Image
                        source={img2}
                        style={styles.img2}
                    />
                    <Text style={styles.text}>{pulang.error.message}</Text>
                </View>
                :
                <View>
                    <Image
                        source={Img}
                        style={styles.img}
                    />
                    <Text style={styles.text}>{pulang.pulang.message}</Text>
                </View>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginVertical: '90%',
        height: 200,
        width: 300,
        borderWidth: 1
    },
    img: {
        height: 100,
        width: 200,
        marginTop: 30,
        marginBottom: 15
    },
    img2: {
        height: 100,
        width: 100,
        marginTop: 30,
        marginBottom: 15,
        textAlign: 'center'
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#264384'
    },
    error: {
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default PresensiBerhasil;
