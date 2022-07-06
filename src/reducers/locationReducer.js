import * as types from '../constants/General';

const initialState = {
    loading: true,
    location: [],
    error: null,
}

function locationReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOCATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case types.LOCATION_SUCCESS:
            console.log('lof', action.payload);

            return {
                ...state,
                loading: false,
                location: action.payload,
                error: null,
            }
        case types.LOCATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }
}

export default locationReducer;