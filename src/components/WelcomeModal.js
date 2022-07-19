import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const welcome = (props) => {

    const profile = useSelector((state) => state.profile)
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                    props.setWelcomeVisible(false);
                }}
            >
                <Icon
                    name='close-circle'
                    size={25}
                    color={"#264384"}
                />
            </TouchableOpacity>
            {profile.profile.Doskar === "Dosen" ? <Text style={styles.text}>Tombol presensi pulang akan muncul setelah 2 jam dari waktu presensi datang</Text> : <Text style={styles.text}>Tombol presensi datang akan muncul dari 06:00:00 sampai 08:30:00 {"\n"} {"\n"} Tombol presensi pulang akan muncul dari 16:00:00 sampai 23:00:00</Text>}
            {/* <Text style={styles.text}>Tombol presensi pulang akan muncul dari 14:30:00 sampai 19:00:00</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginVertical: '90%',
        borderWidth: 2,
        borderColor: '#264384'
    },
    text: {
        textAlign: 'center',
        padding: 5,
        margin: '5%',
        color: '#264384',
        fontFamily: 'Poppins-Regular',
        fontSize: 18
    },
    icon: {
        position: 'absolute',
        top: -10,
        right: -10
    }
})

export default welcome;
