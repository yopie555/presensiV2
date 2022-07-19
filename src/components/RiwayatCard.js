import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../constants/General';

const RiwayatCard = (props) => {
    const [profileVisible, setProfileVisible] = useState(false);
    const [profileVisible2, setProfileVisible2] = useState(false);
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={profileVisible2}
                onRequestClose={() => {
                    setProfileVisible2(false);
                }}>
                <View style={styles.modalContainerImage}>
                    <Image
                        style={styles.modalImage}
                        source={{ uri: `${BASE_URL}/${props.fotP}` }}
                    />
                </View>
            </Modal>
            <View style={styles.containerT}>
                <Text style={styles.text}>Tanggal             : </Text>
                <Text style={styles.text}>{props.tgl}</Text>
            </View>
            <View style={styles.containerT}>
                <Text style={styles.text}>Jam                    : </Text>
                <Text style={styles.text}>{props.jamD}</Text>
            </View>
            <View style={styles.containerT}>
                <Text style={styles.text}>Lokasi                 : </Text>
                <Text style={styles.text} >{props.lokD}</Text>
            </View>
            {/* <View style={styles.containerT}>
                <Text style={styles.text}>Detail Kerja       : </Text>
                <Text style={styles.text}>{props.renK}</Text>
            </View> */}
            {/* <View style={styles.containerT}>
                <Text style={styles.text}>Jam Pulang      : </Text>
                <Text style={styles.text}>{props.jamP}</Text>
            </View>
            <View style={styles.containerT}>
                <Text style={styles.text}>Lokasi Pulang   : </Text>
                <Text style={styles.text}>{props.lokP}</Text>
            </View>
            <View style={styles.containerT}>
                <Text style={styles.text}>Realisasi Kerja : </Text>
                <Text style={styles.text}>{props.relK}</Text>
            </View> */}
            {/* <View style={styles.containerButton}>
                <TouchableOpacity
                    disabled={props.fotD === null ? true : false}
                    style={props.fotD === null ? styles.datangButton : styles.datangButton2}
                    onPress={() => {
                        setProfileVisible(true)
                    }}
                >
                    <Text style={styles.datangText}>Foto Datang</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={props.fotP === null ? true : false}
                    style={props.fotP === null ? styles.datangButton : styles.datangButton2}
                    onPress={() => {
                        setProfileVisible2(true)
                    }}
                >
                    <Text style={styles.datangText}>Foto Pulang</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3e3e3',
        justifyContent: 'center',
        marginHorizontal: 10,
        padding: 8,
        borderRadius: 5,
        // borderWidth: 1,
        marginBottom: 5
    },
    containerT: {
        flexDirection: 'row',
        paddingRight: 90
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    text: {
        fontFamily: 'Poppins-Regular'
    },
    datangButton2: {
        backgroundColor: '#264384',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 35
    },
    datangButton: {
        backgroundColor: '#c4c4c4',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 30
    },
    datangText: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Poppins-Bold'
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
})

export default RiwayatCard;
