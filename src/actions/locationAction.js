import * as types from '../constants/General';
import axios from 'axios';
import { BASE_URL } from '../constants/General';

export const getLocationRequest = () => ({
    type: types.LOCATION_REQUEST,
});

export const getLocationSuccess = (location) => ({
    type: types.LOCATION_SUCCESS,
    payload: location,
});

export const getLocationFailure = (error) => ({
    type: types.LOCATION_FAILURE,
    error,
});

export const locationAction = (value) => {
    console.log('value', value);

    return async (dispatch) => {
        try {
            dispatch(getLocationRequest());
            let url = `${BASE_URL}/cek_lokasi?username=${value.nip}&token=${value.token}&ip=36.66.35.6`
            const res = await axios.post(
                url,
                {
                    latitude: value.latitude,
                    longitude: value.longitude,
                    mac: value.ip
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // console.log('ini res location', res.data);
            dispatch(getLocationSuccess(res.data));
        } catch (error) {
            console.log('Get location Error', error.response.data);
            dispatch(getLocationFailure(error.response.data));
        }
    };
};