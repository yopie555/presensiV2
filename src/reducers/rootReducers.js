import { combineReducers } from 'redux';
import authReducer from './authReducer';
import presensiReducer from './presensiReducer';
import profileRedcer from './profileReducer';
import histoyReducer from './historyReducer';
import locationReducer from './locationReducer';
import addressReducer from './addressReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    presensi: presensiReducer,
    profile: profileRedcer,
    history: histoyReducer,
    location: locationReducer,
    address: addressReducer
})

export default rootReducer