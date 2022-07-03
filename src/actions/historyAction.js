import * as types from '../constants/General';
import axios from 'axios';
import { BASE_URL } from '../constants/General';

export const getHistoryRequest = () => ({
    type: types.HISTORY_REQUEST,
});

export const getHistorySuccess = (history) => ({
    type: types.HISTORY_SUCCESS,
    payload: history,
});

export const getHistoryFailure = (error) => ({
    type: types.HISTORY_FAILURE,
    error,
});

export const historyAction = (value) => {
    console.log('value', value);

    return async (dispatch) => {
        try {
            dispatch(getHistoryRequest());
            let url = `${BASE_URL}/riwayat?token=${value.token}`
            const res = await axios.post(
                url,
                {
                    username: value.nip,
                    start_date: value.text,
                    end_date: value.text2
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // console.log('ini res search', res.data.results);
            dispatch(getHistorySuccess(res.data.results));
        } catch (error) {
            console.log('Get history Error', error.response.data);
            dispatch(getHistoryFailure(error));
        }
    };
};