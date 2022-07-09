import React, { useState, useEffect } from 'react';
import {
    Alert,
    Text,
    View,
    StyleSheet,
    Image,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ToastAndroid,
    Modal,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import moment from 'moment';
import GetLocation from 'react-native-get-location'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BerhasilModal2 from '../components/PresensiBerhasil2'
import LocationModal from '../components/LocationModal';
import { locationAction, addressAction } from '../actions/locationAction';
import { pulangAction } from '../actions/absenAction';
import DeviceInfo from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import { NetworkInfo } from 'react-native-network-info';

import Logo2 from '../assets/umrah.png'
import Background from '../assets/background4.png'

const Presensi2 = ({ navigation }) => {
    const [CurrentTime, setCurrentTime] = useState('');
    const [date, setDate] = useState(new Date());
    const [long, setLong] = useState('');
    const [lat, setLat] = useState('');
    const [ip, setIp] = useState("");
    const [id, setId] = useState("");
    const [berhasilVisible2, setBerhasilVisible2] = useState(false);
    const [locVisible, setLocVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(true)

    const auth = useSelector((state) => state.auth);
    const thisAddress = useSelector((state) => state.address);
    const loc = useSelector((state) => state.location)

    useEffect(() => {
        if (refresh) {
            dispatch(locationAction({ token: auth.auth.token, nip: auth.auth.username, ip, id }));
            setRefresh(false)
        }
        return () => { }
    }, [refresh])

    DeviceInfo.getAndroidId().then((androidId) => {
        setId(androidId)
    });

    NetworkInfo.getIPAddress().then(ipAddress => {
        setIp(ipAddress);
    });

    const p = date.getFullYear()
    const q = date.getMonth() + 1
    const r = date.getDate()

    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        monthName = months[date.getMonth()];

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"],
        dayName = days[date.getDay()];

    setInterval(() => {
        var timeMoment = moment().format('LTS');
        setCurrentTime(timeMoment)
    }, 1000);

    // const getGeo = () => GetLocation.getCurrentPosition({
    //     enableHighAccuracy: true,
    //     timeout: 15000,
    // })
    //     .then(location => {
    //         setLong(location.longitude);
    //         setLat(location.latitude)
    //         return location
    //     })
    //     .catch(error => {
    //         const { code, message } = error;
    //         console.warn(code, message);
    //         Alert.alert('Turn On Your Location')
    //         navigation.navigate('HomepageScreen')
    //     })
    return (
        <ImageBackground
            source={Background}
            style={styles.background}>
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={locVisible}
                    onRequestClose={() => {
                        setLocVisible(false);
                    }}>
                    <View style={styles.welcomeModal}>
                        <LocationModal setLocVisible={setLocVisible} />
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={berhasilVisible2}
                    onRequestClose={() => {
                        setBerhasilVisible2(false);
                    }}>
                    <View style={styles.welcomeModal}>
                        <BerhasilModal2 setBerhasilVisible2={setBerhasilVisible2} />
                    </View>
                </Modal>

                <Image
                    source={Logo2}
                    style={styles.logo2} />

                <View style={styles.container2}>

                    <View style={styles.container3}>
                        <Text style={styles.textTitle}>Presensi Pulang</Text>
                    </View>
                    <View style={styles.container6}>
                        <Text style={styles.textJam}>Tanggal</Text>
                        <View style={styles.container7}>
                            <Text style={styles.textGeo}>
                                {dayName}, {r}/{monthName}/{p}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.container6}>
                        <Text style={styles.textJam}>Jam Server</Text>
                        <View style={styles.container7}>
                            <Text style={styles.textGeo}>
                                {CurrentTime}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.container6}>
                        <Text style={styles.textJam}>Lokasi</Text>
                        <View style={styles.container7}>
                            <Text style={styles.textGeo}>
                                {loc?.location?.lokasi}
                            </Text>
                        </View>
                    </View>
                    <ScrollView style={styles.container8}>
                        <View style={styles.container9}>
                            <TouchableOpacity
                                style={styles.datangButton}
                                onPress={async () => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'HomepageScreen' }],
                                    });
                                }}>
                                <Text style={styles.datangText}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.datangButton2}
                                onPress={() => {
                                    setLoading(true)
                                    dispatch(pulangAction({
                                        token: auth.auth.token,
                                        nip: auth.auth.username,
                                        ip,
                                        id,
                                    }))
                                    setLoading(false)
                                    setBerhasilVisible2(true)
                                    // navigation.navigate("HomepageScreen")
                                }}
                            >
                                <Text style={styles.datangText}>Presensi</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        width: wp('95%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        borderWidth: 1,
        elevation: 3,
        borderColor: '#c4c4c4',
        // marginBottom: 55
    },
    container3: {
        alignItems: 'center',
        backgroundColor: '#c4c4c4',
        // borderRadius: 5,
        marginHorizontal: 10,
        // marginBottom: 10,
        width: wp('95%'),
        borderWidth: 1,
        borderColor: '#c4c4c4',
        marginBottom: 20
    },
    container5: {
        width: wp('95%'),
        alignItems: 'center',
        marginVertical: 5
    },
    container6: {
        width: wp('95%'),
        alignItems: 'center',
        // borderColor: '#c4c4c4',
        marginBottom: 10,
    },
    container7: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    container8: {
        // borderWidth: 1,
        width: wp('87%'),
        // borderColor: '#c4c4c4',
        marginBottom: 10
    },
    container9: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    text: {
        color: '#264384',
        fontFamily: 'Poppins-Regular',
        fontSize: 16
    },
    textTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#264384',
        paddingVertical: 3
    },
    textTitle2: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#264384',
        // fontWeight: 'bold',
        paddingVertical: 3,
        // borderWidth: 1,
        paddingHorizontal: 10,
        // borderColor: '#c4c4c4'
    },
    textJam: {
        fontFamily: 'Poppins-Bold',
        color: '#264384',
        paddingVertical: 3,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textGeo: {
        borderWidth: 1,
        width: wp('80%'),
        borderRadius: 5,
        paddingVertical: 14,
        paddingHorizontal: 10,
        fontSize: 18,
        borderColor: "#264384",
    },
    inputText2: {
        width: '95%',
        // height: '65%',
        borderRadius: 7,
        marginVertical: 10,
        borderColor: '#264384',
        borderWidth: 1,
        marginLeft: 8,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Regular',
        color: "#000"
    },
    btn1: {
        backgroundColor: '#264384',
        borderRadius: 5,
        position: 'absolute',
        top: 8,
        right: 50
    },
    btn2: {
        backgroundColor: '#264384',
        borderRadius: 5,
        position: 'absolute',
        top: 8,
        right: 13
    },
    btn3: {
        alignItems: 'center',
        position: 'absolute',
        right: -2,
        bottom: 1,
        backgroundColor: '#264384',
        borderRadius: 50,
        padding: 3
    },
    btn4: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        backgroundColor: '#264384',
        padding: 3,
        borderRadius: 8,
        width: wp('19%')
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: '#c4c4c4'
    },
    background: {
        width: wp('100%'),
        alignItems: 'center',
        // height: null,
        // alignItems: 'center',
        // justifyContent: 'center',
        flex: 1
    },
    logo2: {
        position: 'absolute',
        width: 45,
        height: 55,
        top: 0,
        right: 8
    },
    datangButton: {
        width: '35%',
        borderRadius: 7,
        backgroundColor: '#B74545',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderColor: '#B74545',
        borderWidth: 1,
        marginHorizontal: 4
    },
    datangButton2: {
        width: '35%',
        borderRadius: 7,
        backgroundColor: '#264384',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderColor: '#264384',
        borderWidth: 1,
        marginHorizontal: 4
    },
    datangText: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Poppins-Bold'
    },
    welcomeModal: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '15%'
    },
})

export default Presensi2