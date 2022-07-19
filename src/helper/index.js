import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeValue = async () => {
    try {
        await AsyncStorage.removeItem('tok');
    } catch (e) {
        // remove error
    }
};
