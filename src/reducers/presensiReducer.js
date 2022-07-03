import * as types from '../constants/General';

const initialState = {
    loading: true,
    presensi: [],
    error: null,
}

function presensiReducer(state = initialState, action) {
    switch (action.type) {
        case types.PRESENSI_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case types.PRESENSI_SUCCESS:
            return {
                ...state,
                loading: false,
                presensi: action.payload,
                error: null,
            }
        case types.PRESENSI_FAILURE:
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