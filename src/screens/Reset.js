import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ImageBackground,
    StatusBar,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Logo2 from '../assets/umrah.png'
import Background from '../assets/background3.png'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import { resetAction } from '../actions/resetAction';

const Reset = ({ navigation }) => {
    const [sandiLama, setSandiLama] = useState("");
    const [sandiBaru, setSandiBaru] = useState("");
    const [loading, setLoading] = useState(false)
    const [konfirmasiSandi, setKonfirmasiSandi] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);


    return (
        <View style={styles.container}>
            {/* <StatusBar hidden={true} /> */}
            <ImageBackground
                source={Background}
                style={styles.background}>
                <Image
                    source={Logo2}
                    style={styles.logo2} />
                <Header />
                <View style={styles.container3}>
                    <Text style={styles.textHistory}>
                        PENTING! Jika belum pernah ganti password,
                        laporkan ke admin kepegawaian terlebih
                        dahulu untuk reset password
                    </Text>
                </View>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(sandiLama) => setSandiLama(sandiLama)}
                    value={sandiLama}
                    placeholder="Kata Sandi Lama"
                />
                <TextInput
                    style={styles.inputText}
                    onChangeText={(sandiBaru) => setSandiBaru(sandiBaru)}
                    value={sandiBaru}
                    placeholder="Kata Sandi Baru"
                />
                <TextInput
                    style={styles.inputText}
                    onChangeText={(konfirmasiSandi) => setKonfirmasiSandi(konfirmasiSandi)}
                    value={konfirmasiSandi}
                    placeholder="Konfirmasi Kata Sandi Baru"
                />
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={async () => {
                        if (
                            sandiLama !== user.auth.password
                        ) { ToastAndroid.show("Periksa Kembali Password Lama anda", 2000) }
                        else if (
                            sandiBaru !== konfirmasiSandi
                        ) { ToastAndroid.show("Sandi Baru dan Konfirmasi Sandi Tidak Sama", 2000) }
                        else {
                            setLoading(true)
                            await dispatch(resetAction({ token: user.auth.token, nip: user.auth.username, sandiLama, sandiBaru, konfirmasiSandi }))
                            setLoading(false)
                            ToastAndroid.show("Password Telah Diganti", 2000)
                            navigation.navigate("HomepageScreen")
                        }
                    }}>
                    {loading ? <View>
                        <ActivityIndicator size="large" color="#28df99" />
                    </View> :
                        <Text style={styles.textLogin}>Simpan</Text>
                    }
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container3: {
        backgroundColor: '#ff5b4f',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        marginBottom: 10
    },
    background: {
        // alignItems: 'center',
        width: wp('100%'),
        flex: 1
    },
    logo2: {
        position: 'absolute',
        width: 45,
        height: 55,
        top: 0,
        right: 8
    },
    textHistory: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
    inputText: {
        // width: '94%',
        borderRadius: 7,
        marginBottom: 15,
        borderColor: '#264384',
        borderWidth: 1,
        marginHorizontal: 10,
        paddingLeft: 15,
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },
    loginBtn: {
        width: '90%',
        borderRadius: 7,
        alignItems: 'center',
        padding: 10,
        marginTop: 25,
        borderWidth: 1,
        backgroundColor: '#264384',
        marginLeft: 17,
    },
    textLogin: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Poppins-Regular'
    },
})
export default Reset;