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
    return async (dispatch) => {
        try {
            dispatch(getDatangRequest());
            let url = `${BASE_URL}/dtg?username=${value.nip}&token=${value.token}`
            const res = await axios.post(
                url,
                {
                    ip: value.ip,
                    mac: value.id,
                    ip_public: value.ipPublic
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            dispatch(getDatangSuccess(res.data));
        } catch (error) {
            dispatch(getDatangFailure(error.response.data));
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
    return async (dispatch) => {
        try {
            dispatch(getPulangRequest());
            let url = `${BASE_URL}/plg?username=${value.nip}&token=${value.token}`
            const res = await axios.post(
                url,
                {
                    ip: value.ip,
                    mac: value.id,
                    ip_public: value.ipPublic
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            dispatch(getPulangSuccess(res.data));
        } catch (error) {
            dispatch(getPulangFailure(error.response.data));
        }
    };
};