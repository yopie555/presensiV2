import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeValue = async () => {
    try {
        await AsyncStorage.removeItem('tok');
        await AsyncStorage.removeItem('nip');
        await AsyncStorage.removeItem('pass');
    } catch (e) {
        // remove error
    }
};
