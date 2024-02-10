import {createSlice} from '@reduxjs/toolkit';
import {useNavigate} from "react-router-dom";

const initialState = {
    isAuthenticated: false,
    userId: null,
    username: null
};



const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setSuccessfulLogin: (state, action) => {
            state.isAuthenticated = true
            let retrievedUserId = action.payload.userId
            let retrievedUsername = action.payload.username
            state.userId = retrievedUserId
            state.username = retrievedUsername
            console.log("SuccessfulLogin user with id {}", retrievedUserId)
        },
        setLogout: (state, action) => {
            state.isAuthenticated = false
            state.userId = null
            state.username = null
        }
    }
});

export const {setSuccessfulLogin, setLogout} = authSlice.actions;

export default authSlice.reducer;
