import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import authReducer from './slices/auth.js';
import appReducer from './slices/app.js';



const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'alvis-',
    whitelist: ["auth", "storage"],
    blacklist: [],
}


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
})

export {rootReducer, rootPersistConfig};