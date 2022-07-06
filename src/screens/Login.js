import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ImageBackground,
    StatusBar,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../actions/authAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';

import Logo from '../assets/presensi.png'
import Logo2 from '../assets/umrah.png'
import Background from '../assets/background2.png'

const Login = ({ navigation }) => {
    const [nip, setNip] = useState("");
    const [password, setPassword] = useState("");
    const [ip, setIp] = useState("");
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    DeviceInfo.getAndroidId().then((androidId) => {
        setId(androidId)
    });

    NetworkInfo.getIPAddress().then(ipAddress => {
        setIp(ipAddress)
    });

    return (
        <View style={styles.container}>
            {/* <StatusBar hidden={true} /> */}
            <ImageBackground
                source={Background}
                style={styles.background}
            >
                <Image
                    source={Logo2}
                    style={styles.logo2}
                />
                <Image
                    source={Logo}
                    style={styles.logo}
                />
                <Text style={styles.text}>LOGIN</Text>
                <View style={styles.container1}>
                    <View style={styles.textContainer}>
                        <Icon
                            name='account'
                            size={45}
                            color={"#C9CACC"}
                        />
                        <TextInput
                            style={styles.inputText}
                            // autoCompleteType=
                            onChangeText={(nip) => setNip(nip)}
                            value={nip}
                            placeholder="Masukkan NIP/NIK"
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Icon
                            name='lock-outline'
                            size={45}
                            color={"#C9CACC"}
                        />
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                            value={password}
                            placeholder="Kata Sandi"
                        />
                    </View>
                    {user.error && (
                        <View style={{ backgroundColor: 'red', marginHorizontal: 20, paddingVertical: 5, borderRadius: 10 }}>
                            <Text style={{
                                color: '#fff',
                                marginHorizontal: 55,
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}>{user.error}</Text>
                        </View>
                    )}
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={async () => {
                            if (
                                nip === "" || password === ""
                            ) { ToastAndroid.show("Harap Isi Semua Data", 2000) }
                            else {
                                setLoading(true)
                                await dispatch(loginAction({ nip, password, ip, id }))
                                setLoading(false)
                                // navigation.navigate("HomepageScreen")
                            }
                        }}>
                        {/* {loading ? <View>
                            <ActivityIndicator size="large" color="#DAC34D" />
                        </View> : */}
                        <Text style={styles.textLogin}>Masuk</Text>
                        {/* } */}
                    </TouchableOpacity>
                </View>
                <View style={styles.btnPanduan}>
                    <TouchableOpacity
                        style={styles.iconPanduan}
                        onPress={() => navigation.navigate("PanduanScreen")}
                    >
                        <Icon
                            name='book-outline'
                            size={35}
                            color={"#264384"}
                        />
                    </TouchableOpacity>
                    <Text style={styles.panduan}>Panduan Aplikasi</Text>
                </View>
            </ImageBackground >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container1: {
        height: 320,
        width: 320,
        backgroundColor: '#FFF',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    background: {
        width: '100%',
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 55,
        height: 75,
        marginBottom: 10,
    },
    logo2: {
        position: 'absolute',
        width: 45,
        height: 55,
        top: 0,
        right: 8
    },
    text: {
        fontSize: 27,
        color: '#FFF',
        fontFamily: 'Poppins-Regular',
        marginBottom: 10
    },
    inputText: {
        width: '80%',
        borderRadius: 7,
        marginBottom: 10,
        borderColor: '#264384',
        borderWidth: 1,
        marginLeft: 8,
        paddingLeft: 15,
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        color: '#000'
    },
    textContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    loginBtn: {
        width: '90%',
        borderRadius: 7,
        alignItems: 'center',
        padding: 10,
        marginTop: 35,
        borderWidth: 1,
        backgroundColor: '#264384',
        marginLeft: 17,
    },
    textLogin: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Poppins-Regular'
    },
    btnPanduan: {
        position: 'absolute',
        bottom: 5,
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 50
    },
    panduan: {
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 9
    },
    iconPanduan: {
        backgroundColor: '#FFF',
        borderRadius: 50,
        padding: 5
    }
})
export default Login;
