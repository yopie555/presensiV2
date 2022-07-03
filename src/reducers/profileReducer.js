import * as types from '../constants/General';

const initialState = {
    loading: true,
    profile: [],
    error: null,
}

function presensiReducer(state = initialState, action) {
    switch (action.type) {
        case types.PROFILE_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case types.PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.payload,
                error: null,
            }
        case types.PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }
}

export default presensiReducer;