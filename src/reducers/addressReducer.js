import * as types from '../constants/General';

const initialState = {
    loading: true,
    address: [],
    error: null,
}

function addressReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case types.ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                address: action.payload,
                error: null,
            }
        case types.ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }
}

export default addressReducer;