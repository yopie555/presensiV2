import * as types from '../constants/General';

const initialState = {
    loading: false,
    history: [],
    error: null,
};

function historyReducer(state = initialState, action) {
    switch (action.type) {
        case types.HISTORY_REQUEST:
            // console.log('req');
            return Object.assign({}, state, {
                loading: true,
            });
        case types.HISTORY_SUCCESS:
            // console.log('reducers', action.payload);
            return Object.assign({}, state, {
                loading: false,
                history: action.payload,
            });
        case types.HISTORY_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: action.error,
            });
        default:
            return state;
    }
}

export default historyReducer;