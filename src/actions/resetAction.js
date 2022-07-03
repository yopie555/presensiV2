import * as types from '../constants/General';
import axios from 'axios';
import { BASE_URL } from '../constants/General';

export const getResetRequest = () => ({
    type: types.RESET_REQUEST,
});

export const getResetSuccess = (reset) => ({
    type: types.RESET_SUCCESS,
    payload: reset,
});

export const getResetFailure = (error) => ({
    type: types.RESET_FAILURE,
    error,
});

export const resetAction = (value) => {
    console.log('value', value);

    return async (dispatch) => {
        try {
            dispatch(getResetRequest());
            let url = `${BASE_URL}/ganti_password?token=${value.token}`
            const res = await axios.post(
                url,
                {
                    username: value.nip,
                    password_lama: value.sandiLama,
                    password_baru: value.sandiBaru,
                    password_konfirmasi: value.konfirmasiSandi
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // console.log('ini res search', res.data);
            dispatch(getResetSuccess(res.data));
        } catch (error) {
            console.log('Get history Error', error.response.data);
            dispatch(getResetFailure(error));
        }
    };
};