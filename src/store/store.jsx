import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SignupDataReducer from './slices/SignupDataSlice';


const rootReducer = combineReducers({ 
    signupData: SignupDataReducer
})


export const store = configureStore({
    reducer: rootReducer,
});
