import { combineReducers } from 'redux';
import authReducer from './authReducer';
import presensiReducer from './presensiReducer';
import profileRedcer from './profileReducer';
import histoyReducer from './historyReducer';
import locationReducer from './locationReducer';
import addressReducer from './addressReducer';
import datangReducer from './datangReducer';
import pulangReducer from './pulangReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    presensi: presensiReducer,
    profile: profileRedcer,
    history: histoyReducer,
    location: locationReducer,
    address: addressReducer,
    datang: datangReducer,
    pulang: pulangReducer
})

export default rootReducer