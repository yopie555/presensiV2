import React, { useState, useEffect } from 'react';
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
    TextInput,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { historyAction } from '../actions/historyAction';
import { useDispatch, useSelector } from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';

import Logo2 from '../assets/umrah.png'
import Background from '../assets/background3.png'
import Header from '../components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const History = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('')
    const [date2, setDate2] = useState(new Date());
    const [mode2, setMode2] = useState('date');
    const [show2, setShow2] = useState(false);
    const [text2, setText2] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile)
    console.log('user', user);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        // Process the date values
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes()
        setText(fDate)

        // Log the Time & Date values
        console.log(fDate)
        // console.log(fTime)
        // console.log(tempDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const onChange2 = (event, selectedDate2) => {
        const currentDate2 = selectedDate2 || date2;
        setShow2(Platform.OS === 'ios');
        setDate2(currentDate2);

        // Process the date values
        let tempDate2 = new Date(currentDate2);
        let fDate2 = tempDate2.getFullYear() + '-' + (tempDate2.getMonth() + 1) + '-' + tempDate2.getDate();;
        let fTime2 = 'Hours: ' + tempDate2.getHours() + ' | Minutes: ' + tempDate2.getMinutes()
        setText2(fDate2)

        // Log the Time & Date values
        console.log(fDate2)
    };

    const showMode2 = (currentMode2) => {
        setShow2(true);
        setMode2(currentMode2);
    };
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
                        Masukkan tanggal awal dan akhir, lalu tekan tombol cari untuk menampilkan riwayat presensi
                    </Text>
                </View>
                <View style={styles.container5}>
                    <Text style={styles.textTitle}>Riwayat Presensi</Text>
                    <View style={styles.container4}>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(date) => setDate(date)}
                            value={text}
                            placeholder={"YYYY-MM-DD"}
                            placeholderTextColor={'grey'}
                        />
                        <TouchableOpacity
                            style={styles.calendar}
                            onPress={() => showMode('date')}
                        >
                            <Icon
                                name="calendar-month"
                                size={30}
                                color="white"
                                style={styles.btnCalendar}
                            />
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <Text style={styles.text2}>s.d</Text>
                    <View style={styles.container4}>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(date2) => setDate2(date2)}
                            value={text2}
                            placeholder={"YYYY-MM-DD"}
                            placeholderTextColor={'grey'}
                        />
                        <TouchableOpacity
                            style={styles.calendar}
                            onPress={() => showMode2('date')}
                        >
                            <Icon
                                name="calendar-month"
                                size={30}
                                color="white"
                                style={styles.btnCalendar}
                            />
                        </TouchableOpacity>
                        {show2 && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date2}
                                mode={mode2}
                                is24Hour={true}
                                display="default"
                                onChange={onChange2}
                            />
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.datangButton}
                        onPress={async () => {
                            if (text === "" || text2 === "") {
                                ToastAndroid.show("Isi Tanggal Dengan Menekan Icon Calender", 2000)
                            }
                            else {
                                setLoading(true)
                                await dispatch(historyAction({ token: user.auth.token, nip: user.auth.username, text, text2 }))
                                setLoading(false)
                                navigation.navigate("RiwayatScreen", { text, text2 })
                            }
                        }}>
                        <Icon2
                            name="search"
                            size={30}
                            color="white"
                        />
                        <Text style={styles.datangText}>Cari Riwayat</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    container3: {
        backgroundColor: '#28df99',
        padding: 10,
        width: '90%',
        borderRadius: 10,
        marginVertical: 10
    },
    container4: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container5: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#c4c4c4'
    },
    background: {
        alignItems: 'center',
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
    textTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        // fontWeight: 'bold',
        color: '#264384',
        marginVertical: 10
    },
    text: {
        color: '#264384',
        fontFamily: 'Poppins-Bold'
    },
    text2: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#c4c4c4',
        marginBottom: 8
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
    btnCalendar: {
        backgroundColor: "#264384",
        margin: 8,
        padding: 3,
        borderRadius: 10
    },
    inputText: {
        width: '75%',
        borderRadius: 7,
        marginBottom: 10,
        // marginRight: 8,
        borderColor: '#264384',
        borderWidth: 1,
        marginLeft: 8,
        paddingLeft: 15,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#000'
    },
    textHistory: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
    datangButton: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 7,
        backgroundColor: '#264384',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderColor: '#264384',
        borderWidth: 1,
    },
    datangText: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Poppins-Bold'
    },
})

export default History;
