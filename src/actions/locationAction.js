import * as types from '../constants/General';
import axios from 'axios';
import { BASE_URL, mapApi } from '../constants/General';

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
    return async (dispatch) => {
        try {
            dispatch(getLocationRequest());
            let url = `${BASE_URL}/cek_lokasi?username=${value.nip}&token=${value.token}`
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
            // console.log('ini res location', res);
            dispatch(getLocationSuccess(res.data));
        } catch (error) {
            console.log('Get location Error', error);
            dispatch(getLocationFailure(error.response.data));
        }
    };
};

export const getAddressRequest = () => ({
    type: types.ADDRESS_REQUEST,
});

export const getAddressSuccess = (address) => ({
    type: types.ADDRESS_SUCCESS,
    payload: address,
});

export const getAddressFailure = (error) => ({
    type: types.ADDRESS_FAILURE,
    error,
});

export const addressAction = (value) => {
    console.log('value', value);

    return async (dispatch) => {
        try {
            dispatch(getAddressRequest());
            let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value.longitude},${value.latitude}.json?access_token=${mapApi}`
            const res = await axios.get(
                url,
            );
            // console.log('ini res location', res.data.features[1]);
            dispatch(getAddressSuccess(res.data.features[1]));
        } catch (error) {
            console.log('Get address Error', error.response.data);
            dispatch(getAddressFailure(error.response.data));
        }
    };
};