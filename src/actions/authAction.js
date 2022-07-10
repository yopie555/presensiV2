import * as types from '../constants/General';
import axios from 'axios';
import { BASE_URL } from '../constants/General';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLoginRequest = () => ({
    type: types.LOGIN_REQUEST,
})

export const getLoginSuccess = (login) => ({
    type: types.LOGIN_SUCCESS,
    payload: login,
})

export const getLoginFailure = (error) => ({
    type: types.LOGIN_FAILURE,
    error
})

export const loginAction = (value) => {
    return async (dispatch) => {
        try {
            dispatch(getLoginRequest());
            let url = `${BASE_URL}/login`
            const res = await axios.post(
                url,
                {
                    username: value.nip,
                    password: value.password,
                    ip: value.ip,
                    mac: value.id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            await AsyncStorage.setItem('username', value.nip);
            await AsyncStorage.setItem('token', res.data.result.token);
            await AsyncStorage.setItem('password', value.password);
            dispatch(getLoginSuccess({
                username: value.nip,
                token: res.data.result.token,
                password: value.password,
                ip: value.ip,
                mac: value.mac
            }));
        }
        catch (error) {
            console.log('err log', error);
            dispatch(getLoginFailure(error.response.data.message));
        }
    }
}

export const checkLogin = () => {
    return async (dispatch) => {
        try {
            let token = await AsyncStorage.getItem('token');
            let password = await AsyncStorage.getItem('password');
            let username = await AsyncStorage.getItem('username');
            if (token && password && username) {
                dispatch(getLoginSuccess({ token, password, username }));
            }
        }
        catch (error) {
            console.log('Get check Error', error);
            dispatch(getLoginFailure(error));
        }
    }
}

export const logoutSuccess = (logout) => {
    return {
        type: types.LOGOUT_SUCCESS,
        payload: logout,
    }
}

export const logoutAction = () => {
    return async (dispatch) => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('password');
            await AsyncStorage.removeItem('ip');
            await AsyncStorage.removeItem('mac');
            dispatch(logoutSuccess());
        }
        catch (error) {
            console.log('Get User Error', error);
            dispatch(getLoginFailure(error));
        }
    }
}