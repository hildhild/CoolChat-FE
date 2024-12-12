import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import SignupDataReducer from './slices/SignupDataSlice';
import SidebarReducer from './slices/SidebarSlice';
import UserReducer from './slices/UserSlice';
import OrganizationReducer from './slices/OrganizationSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['sidebar', 'user', 'organization'],
}


const rootReducer = combineReducers({ 
    signupData: SignupDataReducer,
    sidebar: SidebarReducer,
    user: UserReducer,
    organization: OrganizationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store)