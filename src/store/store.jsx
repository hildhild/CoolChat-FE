import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SignupDataReducer from './slices/SignupDataSlice';
import SidebarReducer from './slices/SidebarSlice';


const rootReducer = combineReducers({ 
    signupData: SignupDataReducer,
    sidebar: SidebarReducer
})


export const store = configureStore({
    reducer: rootReducer,
});
