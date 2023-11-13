import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore, persistReducer} from 'redux-persist';
import {configureStore} from "@reduxjs/toolkit";
import {rootPersistConfig, rootReducer} from "./rootReducer.js";


 const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});
 const persistor = persistStore(store);

export {store, persistor};