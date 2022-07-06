import * as types from '../constants/General';

const initialState = {
    loading: true,
    pulang: [],
    error: null,
}

function pulangReducer(state = initialState, action) {
    switch (action.type) {
        case types.PULANG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case types.PULANG_SUCCESS:
            return {
                ...state,
                loading: false,
                pulang: action.payload,
                error: null,
            }
        case types.PULANG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }
}

export default pulangReducer;