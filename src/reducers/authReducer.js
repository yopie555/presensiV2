import * as types from '../constants/General';

const initialState = {
    loading: true,
    auth: [],
    error: null,
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                auth: action.payload,
                error: null,
            }
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                auth: [],
                error: action.error,
            }
        case types.LOGOUT_SUCCESS:

            return {
                ...state,
                loading: false,
                auth: [],
                error: null,
            }
        default:
            return state;
    }
}

export default authReducer;