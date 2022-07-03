import { combineReducers } from 'redux';
import authReducer from './authReducer';
import presensiReducer from './presensiReducer';
import profileRedcer from './profileReducer';
import histoyReducer from './historyReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    presensi: presensiReducer,
    profile: profileRedcer,
    history: histoyReducer
})

export default rootReducer