import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Modal,
    Button,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';
import WelcomeModal from '../components/WelcomeModal';
import Logo2 from '../assets/umrah.png'
import Background from '../assets/background3.png'
import { useDispatch, useSelector } from 'react-redux';
import { presensiAction, profileAction } from '../actions/presensiAction';

const Homepage2 = ({ navigation }) => {
    const [welcomeVisible, setWelcomeVisible] = useState(true);
    const [refresh, setRefresh] = useState(true)
    const auth = useSelector((state) => state.auth)
    const presensi = useSelector((state) => state.presensi)
    const profile = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const dataPresensi = () => {
        dispatch(presensiAction({ token: auth.auth.token, nip: auth.auth.username }))
        dispatch(profileAction({ token: auth.auth.token, nip: auth.auth.username }))
    }

    useEffect(() => {
        if (refresh) {
            dataPresensi()
            setRefresh(false)
        }
        return () => { }
    }, [refresh])

    // if (presensi.loading == true) {
    //     return (
    //         <View style={styles.loading}>
    //             <ActivityIndicator size="large" color="#DAC34D" />
    //         </View>
    //     );
    // }
    console.log('presensi', presensi);

    return (

        <View style={styles.container}>
            {/* <StatusBar hidden={true} /> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={welcomeVisible}
                onRequestClose={() => {
                    setWelcomeVisible(false);
                }}>
                <View style={styles.welcomeModal}>
                    <WelcomeModal setWelcomeVisible={setWelcomeVisible} />
                </View>
            </Modal>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={dataPresensi}
                    />
                }
            >
                <ImageBackground
                    source={Background}
                    style={styles.background}>
                    <Image
                        source={Logo2}
                        style={styles.logo2} />
                    <Header />
                    <View style={styles.container4}>
                        <Text style={styles.header}>
                            PRESENSI HARI INI
                        </Text>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.container8}>
                            <Text style={styles.descriptionText}>Jam Datang</Text>
                            <Text style={styles.detailsText}>{presensi?.presensi?.data_presensi?.jam_dtg}</Text>
                            <Text style={styles.descriptionText}>Lokasi Datang</Text>
                            <Text style={styles.detailsText}>{presensi?.presensi?.data_presensi?.lokasi_dtg}</Text>
                            <Text style={styles.descriptionText}>Jam Pulang</Text>
                            <Text style={styles.detailsText}>{presensi?.presensi?.data_presensi?.jam_plg}</Text>
                            <Text style={styles.descriptionText}>Lokasi Pulang</Text>
                            <Text style={styles.detailsText}>{presensi?.presensi?.data_presensi?.lokasi_plg}</Text>
                        </View>
                    </ScrollView>
                    <View style={styles.container9}>
                        <TouchableOpacity

                            onPress={() => navigation.navigate("PresensiScreen")}
                            style={presensi.presensi.cek == 0 || presensi.presensi.cek_dtg == 0 ? styles.disabledButton : styles.datangButton}
                            disabled={presensi.presensi.cek == 0 || presensi.presensi.cek_dtg == 0 ? true : false}
                        >
                            <Icon
                                name='login'
                                size={60}
                                color={"#fff"}
                            />
                            <Text
                                style={presensi.presensi.cek_dtg == 0 ? styles.txtFotoD : styles.txtFoto}
                            >
                                Presensi Datang
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("PresensiScreen2")}
                            style={presensi.presensi.cek == 0 || presensi.presensi.cek_plg == 0 ? styles.disabledButton : styles.pulangButton}
                            disabled={presensi.presensi.cek == 0 || presensi.presensi.cek_plg == 0 ? true : false}
                        >
                            <Icon
                                name='logout'
                                size={60}
                                color={"#fff"}
                            />
                            <Text
                                style={presensi.presensi.cek_plg == 0 ? styles.txtFotoD : styles.txtFoto}
                            >
                                Presensi Pulang
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#264384',
    },
    container2: {
        width: '100%',
        height: 100,
        marginTop: 160,
        backgroundColor: '#DAC34D',
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row'
    },
    container4: {
        backgroundColor: "#c9cacc",
        // borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 5
    },
    container8: {
        borderWidth: 1,
        backgroundColor: '#F3F3F3',
        marginHorizontal: '3%',
        marginBottom: 5,
        borderRadius: 5,
        borderColor: '#c4c4c4',
    },
    container9: {
        marginTop: 5,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10
    },
    welcomeModal: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '15%'
    },
    background: {
        width: wp('100%'),
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
    header: {
        color: '#264384',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
        textAlign: 'center',
        paddingVertical: 5
    },
    text: {
        color: '#264384',
        fontFamily: 'Poppins-Regular'
    },
    text1: {
        color: '#264384',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        textAlign: 'center'
    },
    text2: {
        color: '#264384',
        fontFamily: 'Poppins-Regular',
        fontSize: 24,
        textAlign: 'center'
    },
    descriptionText: {
        color: '#264384',
        // fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        paddingHorizontal: '5%',
        fontFamily: 'Poppins-Bold'
    },
    detailsText: {
        color: '#77797D',
        textAlign: 'justify',
        paddingHorizontal: '5%',
        fontFamily: 'Poppins-Regular'
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
    datangButton: {
        width: wp('45%'),
        backgroundColor: '#66C57A',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        borderRadius: 7
    },
    pulangButton: {
        width: wp('45%'),
        backgroundColor: '#EE9D52',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        borderRadius: 7
    },
    disabledButton: {
        width: wp('45%'),
        backgroundColor: '#c4c4c4',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        borderRadius: 7
    },
    datangText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    modalContainerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#264384',
    },
    modalImage: {
        width: '100%',
        height: null,
        aspectRatio: 1,
    },
    fotoBtn: {
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: '#264384',
        borderColor: '#c4c4c4'
    },
    fotoBtnD: {
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: '#c4c4c4',
        borderColor: '#c4c4c4'
    },
    txtFoto: {
        fontFamily: 'Poppins-Regular',
        color: '#fff',
        fontSize: 22,
        // fontWeight: 'bold'
    },
    txtFotoD: {
        fontFamily: 'Poppins-Regular',
        color: '#fff',
        fontSize: 22,
    },
})

export default Homepage2