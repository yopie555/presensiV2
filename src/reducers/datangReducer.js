import * as types from '../constants/General';

const initialState = {
    loading: true,
    datang: [],
    error: null,
}

function datangReducer(state = initialState, action) {
    switch (action.type) {
        case types.DATANG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case types.DATANG_SUCCESS:
            return {
                ...state,
                loading: false,
                datang: action.payload,
                error: null,
            }
        case types.DATANG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }
}

export default datangReducer;