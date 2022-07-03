import * as types from '../constants/General';
import axios from 'axios';
import { BASE_URL } from '../constants/General';

export const getPresensiRequest = () => ({
    type: types.PRESENSI_REQUEST,
});

export const getPresensiSuccess = (presensi) => ({
    type: types.PRESENSI_SUCCESS,
    payload: presensi,
});

export const getPresensiFailure = (error) => ({
    type: types.PRESENSI_FAILURE,
    error,
});

export const presensiAction = (value) => {
    return async (dispatch) => {
        try {
            dispatch(getPresensiRequest());
            const res = await axios.get(`${BASE_URL}/presensi?token=${value.token}&username=${value.nip}`);
            dispatch(getPresensiSuccess(res.data));
        } catch (error) {
            console.log('Get Presensi Error', error.response.data);
            dispatch(getPresensiFailure(error));
        }
    };
};

export const getProfileRequest = () => ({
    type: types.PROFILE_REQUEST,
});

export const getProfileSuccess = (profile) => ({
    type: types.PROFILE_SUCCESS,
    payload: profile,
});

export const getProfileFailure = (error) => ({
    type: types.PROFILE_FAILURE,
    error,
});

export const profileAction = (value) => {
    return async (dispatch) => {
        try {
            dispatch(getProfileRequest());
            const res = await axios.get(`${BASE_URL}/user_detail?token=${value.token}&username=${value.nip}`);
            dispatch(getProfileSuccess(res.data.result));
        } catch (error) {
            console.log('Get Profile Error', error.response.data);
            dispatch(getProfileFailure(error));
        }
    };
};