import * as types from '../constants/General';
import axios from 'axios';
import { BASE_URL } from '../constants/General';

export const getDatangRequest = () => ({
    type: types.DATANG_REQUEST,
});

export const getDatangSuccess = (datang) => ({
    type: types.DATANG_SUCCESS,
    payload: datang,
});

export const getDatangFailure = (error) => ({
    type: types.DATANG_FAILURE,
    error,
});

export const datangAction = (value) => {
    console.log('value', value);

    return async (dispatch) => {
        try {
            dispatch(getDatangRequest());
            let url = `${BASE_URL}/dtg?username=${value.nip}&token=${value.token}`
            const res = await axios.post(
                url,
                {
                    ip: value.ip,
                    longitude: value.longitude,
                    latitude: value.latitude,
                    ip: value.ip,
                    mac: value.id,
                    lokasi_datang: value.lokasi
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log('ini res datang', res.data);
            dispatch(getDatangSuccess(res.data));
        } catch (error) {
            console.log('Get datang Error', error.response.data);
            dispatch(getDatangFailure(error));
        }
    };
};

export const getPulangRequest = () => ({
    type: types.PULANG_REQUEST,
});

export const getPulangSuccess = (pulang) => ({
    type: types.PULANG_SUCCESS,
    payload: pulang,
});

export const getPulangFailure = (error) => ({
    type: types.PULANG_FAILURE,
    error,
});

export const pulangAction = (value) => {
    console.log('value', value);

    return async (dispatch) => {
        try {
            dispatch(getPulangRequest());
            let url = `${BASE_URL}/plg?username=${value.nip}&token=${value.token}`
            const res = await axios.post(
                url,
                {
                    ip: value.ip,
                    longitude: value.longitude,
                    latitude: value.latitude,
                    ip: value.ip,
                    mac: value.id,
                    lokasi_pulang: value.lokasi
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log('ini res pulang', res.data);
            dispatch(getPulangSuccess(res.data));
        } catch (error) {
            console.log('Get Pulang Error', error.response.data);
            dispatch(getPulangFailure(error));
        }
    };
};