import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const location = (props) => {
    const navigation = useNavigation();
    const loc = useSelector((state) => state.location)
    // console.log('loc', loc)

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                    props.setLocVisible(false);
                }}
            >
                <Icon
                    name='close-circle'
                    size={25}
                    color={"#264384"}
                />
            </TouchableOpacity> */}
            {loc.location.status_lokasi === 1 ?
                <Text style={styles.text}>{loc?.location?.message}</Text>
                :
                <Text style={styles.text}>{loc?.location?.message} {"\n"} {"\n"} Anda Tidak Dapat Melanjutkan Proses Presensi</Text>
            }
            {loc.location.status_lokasi === 1 ?
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.setLocVisible(false)
                    }}
                >
                    <Text style={styles.buttonText}>Lanjut</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.setLocVisible(false)
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.buttonText}>Mengerti</Text>
                </TouchableOpacity>
            }



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginVertical: '98%',
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
    },
    button: {
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
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Poppins-Bold'
    }
})

export default location;
